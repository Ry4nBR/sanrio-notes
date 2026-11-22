const configuredBase = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const API_BASE_URL = configuredBase.replace(/\/$/, '');

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...(options.headers || {})
    }
  });

  if (response.status === 204) return null;

  const contentType = response.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await response.json() : null;
  if (!response.ok) {
    throw new Error(body?.error || `Erro HTTP ${response.status}`);
  }
  return body;
}
