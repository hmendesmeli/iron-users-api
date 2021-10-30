const express = require('express');

const User = require('../models/User');

const router = express();

// Rota que cria um novo usuario
// Rota que edita um user pelo ID
// Rota que deleta um user pelo ID

// Rota que lista usuarios
router.get('/users', async (request, response) => {
  try {
    const { name = '', email = '' } = request.query;
  
    const usersFromDb = await User.find({
      name: { $regex: new RegExp(name, 'i') },
      email: { $regex: new RegExp(email, 'i') },
      active: true,
    });
    // find no users do banco.
    
    return response.json(usersFromDb);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ error: error.message })
  }
}); // registrei uma rota GET '/users' dentro do user-routes;

// Rota que retorna UM usuario pelo ID
router.get('/users/:id', async (request, response) => {
  const { id } = request.params;

  const foundUser = await User.findOne({ _id: id, active: true });

  if (!foundUser) {
    return response.status(204).json({});
  }

  return response.json(foundUser);
});

router.post('/users', async (request, response) => {
  const { name, email, password, birthdate } = request.body;

  // Validação de campos obrigatórios
  if (!name || !email || !password) {
    return response.status(400).json({ message: 'Favor preencher o nome e email e senha do novo usuário' });
  }

  // Validação se email informado já está sendo usado
  const userFromDb = await User.findOne({ email });
  console.log(userFromDb);
  if (userFromDb) {
    return response.status(400).json({ message: 'Email em uso. Favor informar outro' })
  }

  // Criar um novo objeto com as infos do novo user e inserir este novo user dentro do array
  const newUserToDb = new User({
    name,
    email,
    password,
    birthdate,
  });

  await newUserToDb.save() // estamos fazendo de conta que o usuário está sendo salvo no banco

  return response.status(201).json(newUserToDb)
}); // rota que vai criar um novo usuario!

router.put('/users/:id', async (request, response) => {
  const { id } = request.params; // pegar o id do user
  const { name, email, password, birthdate } = request.body; // pegar as infos que serão alteradas

  // Validação de campos obrigatórios
  if (!name || !email || !password) {
    return response.status(400).json({ message: 'Favor preencher o nome e email do novo usuário' });
  }

  const infoToUpdate = {
    name,
    email,
    password,
    birthdate,
  };

  const updatedUser = await User.findOneAndUpdate({ _id: id, active: true }, infoToUpdate, { new: true });

  if (!updatedUser) {
    return response.status(400).json({ message: `User com id ${id} não encontrado` });
  }

  response.json(updatedUser);
}); // Editar um usuário específico (através do ID)

router.delete('/users/:id', async (request, response) => {
  // Buscar o user pelo ID
  // Achar o indice dele dentro do array
  // Faz um splice no indice encontrado
  const { id } = request.params;

  const foundUser = await User.findOne({ _id: id, active: true });
  if (!foundUser) {
    return response.status(400).json({ message: `User com id ${id} não encontrado` })
  }

  foundUser.active = false;
  foundUser.save();

  response.json({ message: 'User deletado com sucesso' });
}); // Deletar um user pelo ID


module.exports = router;


// Passar informações pela URL através de rota --- request.params
// Passar informações por query string --- request.query
// Passar informações via corpo da requisição (body) --- Geralmente passamos infos dessa forma quando temos informações vindo de um formulário --- request.body
