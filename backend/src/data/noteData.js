const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve(__dirname, '../../data.json');

function readNotes() {
  if (!fs.existsSync(dataFilePath)) {
    throw new Error('Arquivo de dados nao encontrado');
  }

  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  } catch (error) {
    throw new Error('Arquivo de dados contem JSON invalido');
  }

  if (!Array.isArray(parsed)) {
    throw new Error('Arquivo de dados deve conter um array');
  }

  return parsed;
}

function writeNotes(notes) {
  if (!Array.isArray(notes)) {
    throw new Error('Notas devem ser fornecidas como array');
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(notes, null, 2), 'utf8');
}

module.exports = { dataFilePath, readNotes, writeNotes };
