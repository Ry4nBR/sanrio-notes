# Sanrio Notes - Documento de entrega

## Objetivo

Aplicacao de bloco de notas com API REST Express, front-end React e persistencia em JSON.

## Links

- GitHub: `https://github.com/Ry4nBR/Sanrio-Notes`
- Render: a aguardar deploy externo
- Vercel: a aguardar deploy externo
- Postman: a colecao exportada esta em `postman/sanrio-notes.postman_collection.json`

## Segurança

O projeto possui CORS restrito a origens configuradas, mas ainda nao possui autenticacao, portanto qualquer origem permitida pode alterar os dados. Os principais riscos sao acesso indevido, abuso de requisicoes, concorrencia nas escritas do JSON e exposicao de dados. Devem ser mitigados com autenticação/autorização, validação rigorosa, limites de requisição, logs sem dados sensíveis, backup e uso de banco de dados em produção.

## JSON em produção

`data.json` e simples de inspecionar e adequado ao exercicio didatico. Em produção real, gravação integral, concorrencia, integridade e escalabilidade sao limitacoes. Um banco de dados seria mais adequado para multiusuario.

## Dez mil registros

Com 10 mil notas, leitura e escrita integral aumentam memoria, latencia e risco de perda por concorrencia. Seriam necessarios índices, filtros paginados, escrita concorrente segura e migracao para banco de dados.

## Arquitetura

Concentrar toda a lógica em `server.js` mistura inicializacao, rotas e regras de negocio. A separacao em routes, controllers, validators, services, middlewares e modulo de dados melhora testes e manutencao.

## Limitações

Render e Vercel ainda dependem de autenticação humana; nao existem URLs publicas reais nem prints capturados nesta execução local.
