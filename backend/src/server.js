const express = require('express'); // biblioteca node para backend
const mongoose = require('mongoose'); // Banco de dados MongoDB
const cors = require('cors'); // Para o protocolo não bloquear a requisição a API

const routes = require('./routes'); //Declarando as rotas criadas em routes.js

const server = express(); //Criando um servidor com a função do express


//mongoose - Está chamando o pacote declarado no tipo do arquivo.
//.connect - Está chamando um metodo do mongoose que faz a conexão com o banco, no caso um link para o cluster do Atlas Mongodb
// ('link de conexao',{useNewUrlParser: true} ) useNewUrlParser: true - está falando para a metodo que ele irá utilizar o novo modo de conexão do mongoose ( o mais atualizado da epoca)
mongoose.connect('mongodb+srv://oministack:oministack@cluster0-oaxd3.mongodb.net/omnistack8?retryWrites=true&w=majority', {
  useNewUrlParser: true
});


server.use(cors()); // Estamosfalando que o server irá utilizar o cors para as requisições da API, repare que ele é declarado como uma função cors()
server.use(express.json()); //Estou falando para o express que ele vai utilizar e suportar json como respostas e envios.
server.use(routes); // Estou utilizando as rotas criadas no arquivos routes.js

server.listen(3333); // Está indicando a qual porta do endereço (no caso localhost) o servidor irá responder, nesse caso iria ficar localhost:3333