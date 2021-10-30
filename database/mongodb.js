const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users-api')
  .then(() => console.log('Conectado ao Banco de Dados'))
  .catch(error => console.log('Erro ao tentar conectar ao Banco de Dados', error));
