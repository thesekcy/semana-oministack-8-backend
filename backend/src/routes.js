const express = require('express'); //Declarando o express
const DevController = require('./controllers/DevController'); //Chamando o controller, responsavel pela lógica do código
const LikeController = require('./controllers/LikeController'); //Chamando o controller, responsavel pela lógica do código
const DislikeController = require('./controllers/DislikeController'); //Chamando o controller, responsavel pela lógica do código

const routes = express.Router(); //Aqui estamos declarando a biblioteca Router, responsavel por criar as rotas

//Tipos de rotas:
  //GET - Visualizar
  //POST - Criar
  //PUT - Editar
  //DELETE - Deletar

// A criação das rotas se dá pela escrita:
// routes - Declarando que estou utilizando o Router do express.Router() declarado acima.
// .post o método de acesso as informações que estou utilizando.
// ('/devs', DevController.index); - e dois parametros, o primeiro é o nome da rota, e como será acessada. e o segundo é qual controller que essa rota vai acessar e a função

routes.get('/devs', DevController.index); //Criando uma rota com o metodo Get, onde apenas terá visualização de dados ou apenas o acesso.
routes.post('/devs', DevController.store); //Criando uma rota com o metodo Post, onde o usuario irá criar uma nova informação, mandando ela para o controller.

routes.post('/devs/:devId/likes', LikeController.store); //Criando uma rota com o metodo Post, onde o usuario irá criar uma nova informação, mandando ela para o controller.
routes.post('/devs/:devId/dislikes', DislikeController.store); //Criando uma rota com o metodo Post, onde o usuario irá criar uma nova informação, mandando ela para o controller.

//Repare tambem que nas rotas criadas estamos passando :devId, aparentemente quando eu declaro:algumNome, o código reconehce como um parametro para a rota, que é acessado no controller com o req.params

module.exports = routes; // Exporta as rotas para uso.