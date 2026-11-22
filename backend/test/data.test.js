const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { readNotes, writeNotes } = require('../src/data/noteData');

test('readNotes retorna um array vazio do arquivo principal', () => {
  assert.ok(Array.isArray(readNotes()));
});

test('writeNotes e readNotes preservam uma lista de registros', () => {
  const original = fs.readFileSync(path.resolve(__dirname, '../data.json'), 'utf8');
  try {
    const records = [{ id: 'teste', titulo: 'Temporaria', texto: 'Teste' }];
    writeNotes(records);
    assert.deepEqual(readNotes(), records);
  } finally {
    fs.writeFileSync(path.resolve(__dirname, '../data.json'), original, 'utf8');
  }
});
