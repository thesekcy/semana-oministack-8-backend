const axios = require('axios');
const Dev = require('../models/Dev');


// Todos os controllers são baseados em cinco funções.
//   @index - get - apenas visualização
//   @store - post - criação e armazenamento
//   @edit - put - atualização de dados
//   @delete - delete - deleta um dado




module.exports = { //Exporta o modulo dentro das chaves para uso

  async index(req, res){ // método index que está recebendo uma requisição e esperando uma resposta (req, res)
    const { user } = req.headers; //Estamos pegando dentro da requisição (req) o headers (cabeçalho da requisição)
    // Repare que há uma desconstrução do código, { users } = req.headers; é a mesma coisa de : users = req.headers.user

    // Criando uma constante que vai receber os dados do model Dev, que foi importado no começo do código
    const loggedDev = await Dev.findById(user); // loggedDev (devLogado) é igual a await Dev(model).findById(vai procurar no modelo por um id)(user(que está sendo passado pela variavel user acima))
    // o uso do await é seguido do async antes da declaração do metodo no caso aqui async this.index, serve para falar ao servidor que ele vai fazer uma requisição de varios dados e vai demorar um pouco, para ele esperar até que acabe para continuar.
    

// Abaixo apenas especulações
    // não entendi muito bem o funcionamento de algumas coisas na constante abaixo apenas que são funções do MongoDB
    // E que ela tem a função de ver quais usuarios irão ser mostrado na visualização para dar like ou dislike.
    // E que funciona como um certo if o $ne seria = Not equal (não é igual) e $nin seria algo como não contem.
    // $nin funcionaria como uma varredura no array de likes ou dislikes.
    const users = await Dev.find({ // a constante vai rodar dentro do model Dev e com o .find vai procurar cada usuario registrado, passar no $and, e se for validado em todos, é passado para dentro de users
      //O uso do await ainda segue com o async declarado ao lado do metodo no topo e com a função de fazer o código esperar ser rodado todos os usuarios.
      $and: [ //O and funciona como um if, ao invez de utilizar o if e os && - && - && | ele joga tudo dentro dessa "função" e faz a verificação de todos, se todos forem verdadeiros passa, se não, não passa.
        // _id é o dado que está sendo pego da API do github, onde trás o id da conta
        // loggedDev é o dev que está logado atualmente no sistema.
        { _id: { $ne: user } }, //Se o _Id não for igual ele exibe (para evitar que ele exiba a mim mesmo no aplicativo)
        { _id: { $nin: loggedDev.likes } }, // Se não possui o _id: dentro do array loggedDev.likes ele exibe se tiver não exibe
        { _id: { $nin: loggedDev.dislikes } }, // Se não possui o _id: dentro do array loggedDev.dislikes ele exibe se tiver não exibe
      ],
    });

    return res.json(users); //devolve a resposta para a requisição, e volta os users, apenas os que passaram pelo "if do $and" e serão exibidos na tela do dev logado atualmente.
  },


  //O metodo store é acessado quando o usuario coloca o username do github dele no campo de pesquisa, a rota envia para  "/devs" @store como POST
  //Junto com o POST vem os paremetros que é a req(requisição) que trás todas as informações do formulario, e a res(resposta) que espera a resposta do controller
  async store(req, res){ // método que tem a principal função de guardar os dados no banco de dados, no caso no MongoDB
        
    const { username } = req.body // utilizando novamente a "chamada desconstruida" onde esperamos receber o username de dentro do req.body
    //equivale a const username = req.body.username
    //body é o corpo da requisição aonde o json é transmitido pela API. 

    //A constante abaixo é responsavel por procurar um usuario já cadastrado, caso alguem tente entrar com a mesma conta, ao invez de criar novamente ele apenas volta com os dados.
    const userExists = await Dev.findOne({user: username}); //ele utiliza o await novamente aguardando percorrer o banco, e fala que ele vai procurar dentro do model Dev .findOne(apenas um) user que é igual a username e depois jogar dentro da variavel userExist

    if(userExists){ //no if ele verifica userExist? se tiver algo dentro a resposta é true, se não é false, se cair no false ele continua o metodo, caso entre no true
      //ele cai no if e retorna um json na res(resposta) com os dados do userExist;
      return res.json(userExists);
      // o método srote encerra aqui.
    }

    //Se passou pelo if ele agora vai guardar uma response(resposta) = da requisição ao servidor da api (por isso o uso novamente do awit).
    //Para fazer a requisição é usado a biblioteca axios, que da diversas funções prontas como o .get que tem o papel de pegar os dados do caminho da api e apresentalo dentro de algo.
    const response = await axios.get(`https://api.github.com/users/${username}`);

    //Abaixo ele vai criar uma constante e vai guardar alguns dados da API dentro de variaveis.
    //Com a nova versão do javascript não é necessario declarar uma variavel se ela for ter o mesmo nome, logo é só apenas chamar o nome do dado
    //Antigamente seria assim { name: name, bio: bio, avatar_url: avatar}
    const { name, bio, avatar_url: avatar } = response.data;
   

    //Finalente ele guarda no banco utilizando a função do MongoDB .create que vai criar um novo registro dentro do model Dev que vem antes do .
    //guardando dentro dele todos os dados dentro das chaves.
    const dev = await Dev.create({
      name,
      user: username, //repare que aqui estamos adicionando um camp que não vem por padrão dentro do response.data que criamos acima. isso porque era uma informação que ja tinhamos, que é o username. Poderiamos chamar tambem mais ia causar duplicidade de dado.
      bio,
      avatar
    })

    return res.json(dev); //por fim retorna o .json para a "view" dentro da res(resposta)
  }
};