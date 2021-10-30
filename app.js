const express = require('express');

const usersRoutes = require('./routes/user-routes');

require('./database/mongodb');

const app = express();

// CRIAR UMA API QUE RETORNE INFOS DE USUARIOS E FAÇA UM CRUD!!!

// Criar Middleware para preparar o express para receber JSON pelo BODY da requisição'
app.use(express.json());

// Criar um Middleware de configuração de rotas
app.use('/', usersRoutes); // TODO REQUEST QUE FOR FEITO A PARTIR DA ROTA '/', ELE VAI PROCURAR ESSA ROTA DENTRO DO USER-ROUTES

app.listen(5000, () => console.log('App rodando na porta 5000'));
