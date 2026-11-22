const { ALLOWED_CHARACTERS, DEFAULT_CHARACTER } = require('../constants/characters');

function validateNote(body) {
  const errors = {};

  if (typeof body.titulo !== 'string' || body.titulo.trim() === '') {
    errors.titulo = 'O titulo deve ser um texto nao vazio';
  }

  if (typeof body.texto !== 'string' || body.texto.trim() === '') {
    errors.texto = 'O texto deve ser um texto nao vazio';
  }

  const personagem = body.personagem === undefined || body.personagem === ''
    ? DEFAULT_CHARACTER
    : body.personagem;

  if (typeof personagem !== 'string' || !ALLOWED_CHARACTERS.includes(personagem)) {
    errors.personagem = 'Personagem invalido';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    value: {
      titulo: typeof body.titulo === 'string' ? body.titulo.trim() : body.titulo,
      texto: typeof body.texto === 'string' ? body.texto.trim() : body.texto,
      personagem
    }
  };
}

module.exports = { validateNote };
