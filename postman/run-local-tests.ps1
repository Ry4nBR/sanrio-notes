$ErrorActionPreference = 'Stop'

$repositoryRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$backendRoot = Join-Path $repositoryRoot 'backend'
$collectionPath = Join-Path $PSScriptRoot 'sanrio-notes-local.postman_collection.json'
$port = 3100

if (Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue) {
  throw "Port $port is already in use. Stop that service and retry."
}

$tempRoot = Join-Path $env:TEMP ('sanrio-postman-local-' + [guid]::NewGuid().ToString('N'))
$isolatedBackend = Join-Path $tempRoot 'backend'
$stdoutPath = Join-Path $tempRoot 'api-out.log'
$stderrPath = Join-Path $tempRoot 'api-err.log'
$oldPort = $env:PORT
$oldNodePath = $env:NODE_PATH
$oldNpmPrefix = $env:npm_config_prefix
$oldNpmCache = $env:npm_config_cache
$api = $null

try {
  New-Item -ItemType Directory -Path (Join-Path $isolatedBackend 'src') -Force | Out-Null
  Copy-Item -LiteralPath (Join-Path $backendRoot 'server.js') -Destination (Join-Path $isolatedBackend 'server.js')
  Copy-Item -Path (Join-Path $backendRoot 'src\*') -Destination (Join-Path $isolatedBackend 'src') -Recurse
  [System.IO.File]::WriteAllText(
    (Join-Path $isolatedBackend 'data.json'),
    '[]',
    [System.Text.UTF8Encoding]::new($false)
  )

  $env:PORT = [string]$port
  $env:NODE_PATH = Join-Path $backendRoot 'node_modules'
  $env:npm_config_prefix = Join-Path $tempRoot 'npm-prefix'
  $env:npm_config_cache = Join-Path $tempRoot 'npm-cache'
  New-Item -ItemType Directory -Path $env:npm_config_prefix, $env:npm_config_cache -Force | Out-Null

  $nodePath = (Get-Command node.exe).Source
  $api = Start-Process -FilePath $nodePath -ArgumentList 'server.js' `
    -WorkingDirectory $isolatedBackend -PassThru -WindowStyle Hidden `
    -RedirectStandardOutput $stdoutPath -RedirectStandardError $stderrPath

  $ready = $false
  for ($attempt = 0; $attempt -lt 20; $attempt++) {
    if ($api.HasExited) { break }
    $healthStatus = & curl.exe -sS -o NUL -w '%{http_code}' "http://127.0.0.1:$port/health" 2>$null
    if ($LASTEXITCODE -eq 0 -and $healthStatus -eq '200') {
      $ready = $true
      break
    }
    Start-Sleep -Milliseconds 500
  }

  if (-not $ready) {
    if (Test-Path $stdoutPath) { Get-Content $stdoutPath }
    if (Test-Path $stderrPath) { Get-Content $stderrPath }
    throw 'The isolated API did not become ready.'
  }

  Write-Output 'Isolated API health: HTTP 200'
  npx --yes newman run $collectionPath --reporters cli --timeout-request 10000
  if ($LASTEXITCODE -ne 0) {
    throw "Newman exited with code $LASTEXITCODE."
  }
} finally {
  if ($api -and -not $api.HasExited) {
    Stop-Process -Id $api.Id -Force
  }
  if (Test-Path $tempRoot) {
    Remove-Item -LiteralPath $tempRoot -Recurse -Force
  }
  if ($null -eq $oldPort) { Remove-Item Env:PORT -ErrorAction SilentlyContinue } else { $env:PORT = $oldPort }
  if ($null -eq $oldNodePath) { Remove-Item Env:NODE_PATH -ErrorAction SilentlyContinue } else { $env:NODE_PATH = $oldNodePath }
  if ($null -eq $oldNpmPrefix) { Remove-Item Env:npm_config_prefix -ErrorAction SilentlyContinue } else { $env:npm_config_prefix = $oldNpmPrefix }
  if ($null -eq $oldNpmCache) { Remove-Item Env:npm_config_cache -ErrorAction SilentlyContinue } else { $env:npm_config_cache = $oldNpmCache }
}
