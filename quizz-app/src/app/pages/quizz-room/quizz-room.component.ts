import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from 'src/app/core/services/data/web-socket.service';
import { Question } from 'src/app/shared/models/question.model';
import { AuthService, UserStatus } from 'src/app/core/authentication/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-quizz-room',
  templateUrl: './quizz-room.component.html',
  styleUrls: ['./quizz-room.component.scss']
})
export class QuizzRoomComponent implements OnInit, OnDestroy {

  public score : number = 0;
  public scoreTmp :  number = 0
  public question: Question
  public reception : boolean =  false;
  public config;
  public tabResult: [{position:number, email:string, score: number}]
  public displayedColumns: string[] = ['Position', 'Email', 'Score'];
  public fin = false;
  public quizz : {
    title : string
    nbrQuestion : number
  };
  
  userSubscription: Subscription;
  userStatus: UserStatus;


  constructor(private authService: AuthService, public webSocketService : WebSocketService) {
    this.userSubscription = this.authService.currentUser.subscribe(status => {
      this.userStatus = status
    });
  }

  ngOnInit(): void {
    console.log(this.userStatus.email);
    this.jouer()
  }


  jouer() {

    
    this.webSocketService.connect('playQuizz') //connexion de la socket vers le bon namspace
    
    console.log("demande de connexion au server playQuizz")

    this.webSocketService.listen('quizz')
      .subscribe((quizz:{title:string,nbrQuestion:number})=>{
        this.quizz = quizz;
      })

    this.webSocketService.listen('question')
      .subscribe((question : Question)=>{
        this.reception = true;
        this.question = question;
        console.log("recreption de la question : "+ question.contenu);
        this.config = {leftTime: 10, format: 's'}
        this.score += this.scoreTmp;
      }
    );
    
    this.webSocketService.listen('end')
      .subscribe(()=>{
        console.log('fin des question');
        this.sendScore()
      })

    this.webSocketService.listen('resultat')
     .subscribe((resultat: [{position:number, email:string,score:number}])=>{
        console.log(resultat);
        this.tabResult = resultat;
        this.webSocketService.close();
        this.fin = true;
      }
    );
    
  }


  sendScore(){

   setTimeout(()=>{ 
    this.score += this.scoreTmp;
    this.webSocketService.emit('score',{
      
      email : this.userStatus.email,
      score : this.score
    });
    }, 10000);
  }

  answer(response : string){

    if(response === this.question.reponse){

      this.scoreTmp = 1;

    }else{

      this.scoreTmp = 0;

    }
  }

  /* Se désinscrire de l'observable */
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe;
  }


  onReplay(){
    this.reception = false;
    this.fin = false;
    this.score = 0;
    this.jouer();
  }

}
