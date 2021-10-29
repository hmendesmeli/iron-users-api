const express = require('express');

const User = require('../models/User');
const userData = require('../data');

const router = express();

// Rota que cria um novo usuario
// Rota que edita um user pelo ID
// Rota que deleta um user pelo ID

// Rota que lista usuarios
router.get('/users', async (request, response) => {
  try {
    const { name = '', email = '' } = request.query;
  
    const usersFromDb = await User.find();
    // find no users do banco.
    
    return response.json(usersFromDb);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message })
  }
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

router.post('/users', (request, response) => {
  const { name, email } = request.body;

  // Validação de campos obrigatórios
  if (!name || !email) {
    return response.status(400).json({ message: 'Favor preencher o nome e email do novo usuário' });
  }

  // Validação se email informado já está sendo usado
  const emailExists = userData.some((user) => user.email === email);
  if (emailExists) {
    return response.status(400).json({ message: 'Email em uso. Favor informar outro' })
  }

  // Criar um novo objeto com as infos do novo user e inserir este novo user dentro do array
  const newUser = {
    id: new Date().getTime(),
    name: name,
    email: email,
  };

  userData.push(newUser); // estamos fazendo de conta que o usuário está sendo salvo no banco

  return response.status(201).json(newUser)
}); // rota que vai criar um novo usuario!

router.put('/users/:id', (request, response) => {
  const { id } = request.params; // pegar o id do user
  const { name, email } = request.body; // pegar as infos que serão alteradas

  // Validação de campos obrigatórios
  if (!name || !email) {
    return response.status(400).json({ message: 'Favor preencher o nome e email do novo usuário' });
  }

  const foundUser = userData.find((el) => el.id.toString() === id);
  if (!foundUser) {
    return response.status(400).json({ message: `User com id ${id} não encontrado` });
  }

  foundUser.name = name;
  foundUser.email = email;

  response.json(foundUser);
}); // Editar um usuário específico (através do ID)

router.delete('/users/:id', (request, response) => {
  // Buscar o user pelo ID
  // Achar o indice dele dentro do array
  // Faz um splice no indice encontrado
  const { id } = request.params;

  const userIndex = userData.findIndex((user) => user.id.toString() === id);
  if (userIndex < 0) {
    return response.status(400).json({ message: `User com id ${id} não encontrado` })
  }

  userData.splice(userIndex, 1); // Quero deletar 1 usuário a partir do indice encontrado

  response.json({ message: 'User deletado com sucesso' });
}); // Deletar um user pelo ID


module.exports = router;


// Passar informações pela URL através de rota --- request.params
// Passar informações por query string --- request.query
// Passar informações via corpo da requisição (body) --- Geralmente passamos infos dessa forma quando temos informações vindo de um formulário --- request.body
