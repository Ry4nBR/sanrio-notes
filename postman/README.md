# Coleção Postman - Sanrio Notes API

A coleção principal usa a API publicada no Render para documentação e consultas. Para executar requisições com escrita, use a coleção local automatizada em `http://127.0.0.1:3100`; não execute POST/PUT/DELETE contra produção sem autorização.

Use `baseUrl` para a origem da API e `noteId` para o ID retornado pela criação. Crie uma nota no POST e copie o `id` da resposta para `noteId` antes de consultar, atualizar ou excluir.

## Endpoints

- GET `{{baseUrl}}/api/notes`
- GET `{{baseUrl}}/api/notes/{{noteId}}`
- POST `{{baseUrl}}/api/notes`
- PUT `{{baseUrl}}/api/notes/{{noteId}}`
- DELETE `{{baseUrl}}/api/notes/{{noteId}}`

Os corpos de POST e PUT e a descrição de parâmetros/respostas estão na [coleção exportada](./sanrio-notes.postman_collection.json).

| Operação | Endpoint/parâmetro | Corpo | Respostas principais |
|---|---|---|---|
| Listar (Read) | `GET /api/notes` — nenhum | — | 200 com array JSON |
| Consultar (Read) | `GET /api/notes/{{noteId}}` — ID no caminho | — | 200; 404 se não encontrado |
| Criar (Create) | `POST /api/notes` | `titulo`, `texto` e `personagem` | 201; 400 se inválido |
| Atualizar (Update) | `PUT /api/notes/{{noteId}}` — ID no caminho | `titulo`, `texto` e `personagem` | 200; 400 se inválido; 404 se não encontrado |
| Excluir (Delete) | `DELETE /api/notes/{{noteId}}` — ID no caminho | — | 204 sem corpo; 404 se não encontrado |

`titulo` e `texto` devem ser strings não vazias. `personagem` deve ser um dos IDs do catálogo; se omitido na criação, a API usa `cinnamoroll`. A variável `noteId` deve receber o `id` retornado pelo POST antes de executar as operações por ID.

Documentação pública: https://documenter.getpostman.com/view/52845937/2sBYPv3CLw

A documentação pública está acessível, mas o compartilhamento direto da coleção e sua listagem na Public API Network não foram habilitados pelo plano/permissões atuais do workspace.

## Testes CRUD locais automatizados

Use a coleção automatizada [sanrio-notes-local.postman_collection.json](./sanrio-notes-local.postman_collection.json) com uma API local isolada. Ela cria uma nota com identificador único, lista, consulta, atualiza, exclui e confirma que a nota deixou de existir. Os scripts validam códigos HTTP e dados de resposta.

Execute `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\postman\run-local-tests.ps1`. O script cria uma cópia temporária do backend com `data.json` vazio, inicia a API na porta `3100` e roda a coleção com Newman (Postman Collection Runner CLI). Não altere `baseUrl` para produção: o fluxo inclui POST, PUT e DELETE. A cópia e seus dados são removidos ao final. Newman é baixado temporariamente pelo `npx`; é necessário acesso ao npm.

Essa coleção testa a **API HTTP**, não a interface React. O enunciado da atividade pede a coleção CRUD e a documentação da API; não exige testes de componentes React.
