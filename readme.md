# Bem vindo ao projeto TimDev OminiStack #8 - Backend API.

Este projeto é baseado na semana **OminiStack** da **[Rocketseat](https://rocketseat.com.br)**.
Neste projeto criamos a API responsavel por passar as informações para o frontend em react, a API foi criada utilizando **node.js**/**express.js** com a database **MongoDB**

Todos os dados de devs aplicados pelo usarname são puxados do github pela **[API](https://api.github.com/users/thesekcy)** própria deles.

    https://api.github.com/users/username


# Comentários

A maioria dos arquivos estão comentados de acordo com o meu entendimento pessoal, **podendo não estar 100% correto nas palavras usadas.**

## Utilizando a API.

Para utilizar a API aconselho utilizar o **Axios** - *`yarn add axios`*

Caso queira testar API pode utilizar o software ***[Insomnia](https://insomnia.rest/)***, ele é um REST client que faz simulações de requisições HTTP.

Para as requisições foram usados 4 rotas. na porta :3333 (localhost:3333)

 1. Listagem de devs - *GET* 
 2. Like - *POST* 
 3. Dislike - *POST* 
 4. Cadastrar Dev - *POST*

**Cadastrar Dev**
	Passar um Body em JSON  com o método POST para o URL http://localhost:3333/devs
	
	JSON Body
    {
    	"username": "thesekcy"
    }
o ***username*** passado é um username valido do GitHub.
 
 **Listagem de devs**
	 Utilizar apenas um Header na requisição. Header: user  e Value: id na URL http://localhost:3333/devs com o método GET

**Like e Dislike**
Ambos vão com o Body vazio com apenas um Header, no header passar user e value uma id.
O id do header é o Dev que está fazendo a ação e o ID na URL (http://localhost:3333/devs/id/likes) é o dev que está recebendo a id, o mesmo vale para o deslike: http://localhost:3333/devs/id/dislikes
