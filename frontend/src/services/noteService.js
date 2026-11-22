import { apiRequest } from './api';

export function getNotes() {
  return apiRequest('/api/notes');
}

export function getNoteById(id) {
  return apiRequest(`/api/notes/${id}`);
}

export function createNote(data) {
  return apiRequest('/api/notes', { method: 'POST', body: JSON.stringify(data) });
}

export function updateNote(id, data) {
  return apiRequest(`/api/notes/${id}`, { method: 'PUT', body: JSON.stringify(data) });
}

export function deleteNote(id) {
  return apiRequest(`/api/notes/${id}`, { method: 'DELETE' });
}
