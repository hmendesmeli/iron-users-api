const express = require('express');

const userData = require('../data');

const router = express();

// Rota que cria um novo usuario
// Rota que edita um user pelo ID
// Rota que deleta um user pelo ID

// Rota que lista usuarios
router.get('/users', (request, response) => {
  const { name = '', email = '' } = request.query;

  const filteredUsers = userData.filter((user) => {
    // logica usando name && logica usando o email
    return user.name.toLowerCase().includes(name.toLowerCase()) &&
    user.email.toLowerCase().includes(email.toLowerCase());
  });

  return response.json(filteredUsers);
}); // registrei uma rota GET '/users' dentro do user-routes;

// Rota que retorna UM usuario pelo ID
router.get('/users/:id', (request, response) => {
  const { id } = request.params;

  const foundUser = userData.find((el) => el.id.toString() === id); // find faz um loop no nosso array de users para procurar um user baseado na condição que escrevermos

  if (!foundUser) {
    return response.status(204).json({});
  }

  return response.json(foundUser);
});


module.exports = router;


// Passar informações pela URL através de rota --- request.params
// Passar informações por query string --- request.query
// Passar informações via corpo da requisição (body) --- Geralmente passamos infos dessa forma quando temos informações vindo de um formulário
