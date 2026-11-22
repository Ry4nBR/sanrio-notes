function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    next(error);
    return;
  }

  console.error(error);

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    res.status(400).json({ error: 'JSON malformado' });
    return;
  }

  res.status(error.status || 500).json({
    error: error.status ? error.message : 'Erro interno do servidor'
  });
}

module.exports = errorHandler;
