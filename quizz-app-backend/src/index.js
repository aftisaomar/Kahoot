const express = require('express');
require('./db/mongoose')
const cors = require('cors');
const userRouter = require('./routers/user');
const quizzRouter = require('./routers/quizz');
const questionRouter = require('./routers/question')
const http = require('http');
 
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
app.use(cors({
    origin: 'http://localhost:4200',
    credentials : true
}))

const port = process.env.PORT || 3000;

//Configure automatic json parsing
app.use(express.json());
// Registering routers
app.use(userRouter.router);
app.use(quizzRouter)
app.use(questionRouter)

//Socket connexion

let tabSocket = []
const quizzInfo = {
  title : '',
  nbrQuestion : 0
}

let questions = []
let tabResult = []
let nombreConnexion = 0;

//Connexion joueur
const gameQuizz = io.of("playQuizz");
gameQuizz.on('connection',(socket)=>{

  console.log('connexion du user '+socket.id);
  nombreConnexion++;
  console.log('nombre de connexion '+nombreConnexion);
  tabSocket.push(socket);
  
})

//Connexion admin
const playQuizz = io.of("startQuizz")
playQuizz.on('connection',(socket)=>{

  console.log('connexion admin');

  //Recuperer  tout les quizz grace a un on.
  socket.on('quizz',(quizz)=>{ 
   quizzInfo.title = quizz.title
   quizzInfo.nbrQuestion = quizz.questions.length
   questions = quizz.questions

  })

  //socket.emit('message',"connexion de l'admin");
  let counter = 0;

  let i = setInterval(function(){
    //Envoyer tout d'abord nos information quizz
    tabSocket.forEach(socketUser => socketUser.emit('quizz',quizzInfo));
    
    tabSocket.forEach(socketUser => socketUser.emit('question',questions[counter]));

    //socket.to('partie').emit('question',questions[counter])
    console.log("envoi au client de la question : "+ counter)

    counter++;
    
    if(counter >= questions.length) {
      tabSocket.forEach(socketUser => socketUser.emit('end'));
      clearInterval(i);
    }
  }, 10000)

  tabSocket.forEach(socketUser => socketUser.on('score',(score)=>{

    tabResult.push({
      position : 0,
      email : score.email,
      score : score.score
    });

    console.log(tabSocket.length);
    //console.log(nombreOfConection);

    //Trouver le bon nombre de joueur authentifier
    if(tabResult.length == nombreConnexion){
      tabResult.sort((a,b)=>{

        return -(a.score - b.score)

      })

      tabResult.forEach((Element,index)=> Element.position = (index+1))

      console.log(tabResult)
      tabSocket.forEach(socketUser => socketUser.emit('resultat',tabResult))
      socket.emit('resultat',tabResult)
      console.log('fin')
      tabResult =[]
      nombreConnexion = 0;
      tabSocket =[]
    }
     
  }));

})



/*app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})*/

server.listen(port ,()=>{

  console.log(`Server is up and running on port ${port}`);

});
