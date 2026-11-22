const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../server');

const dataPath = path.resolve(__dirname, '../data.json');
const originalData = fs.readFileSync(dataPath, 'utf8');

test('GET /api/notes lista notas', async () => {
  const response = await request(app).get('/api/notes');
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(response.body));
});

test('CRUD completo cria, consulta, atualiza e exclui uma nota', async () => {
  fs.writeFileSync(dataPath, '[]', 'utf8');

  const created = await request(app).post('/api/notes').send({
    titulo: 'Nota de teste',
    texto: 'Conteudo de teste',
    personagem: 'cinnamoroll'
  });
  assert.equal(created.status, 201);
  assert.ok(created.body.id);

  const found = await request(app).get(`/api/notes/${created.body.id}`);
  assert.equal(found.status, 200);

  const updated = await request(app).put(`/api/notes/${created.body.id}`).send({
    titulo: 'Nota atualizada',
    texto: 'Conteudo atualizado',
    personagem: 'kuromi'
  });
  assert.equal(updated.status, 200);
  assert.equal(updated.body.titulo, 'Nota atualizada');
  assert.equal(updated.body.criadoEm, created.body.criadoEm);
  assert.notEqual(updated.body.atualizadoEm, created.body.atualizadoEm);

  const deleted = await request(app).delete(`/api/notes/${created.body.id}`);
  assert.equal(deleted.status, 204);
  const missing = await request(app).get(`/api/notes/${created.body.id}`);
  assert.equal(missing.status, 404);
});

after(() => {
  fs.writeFileSync(dataPath, originalData, 'utf8');
});
