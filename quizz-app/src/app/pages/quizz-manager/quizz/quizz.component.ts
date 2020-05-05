import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Quizz } from 'src/app/shared/models/quizz.model';
import { MatDialog } from '@angular/material/dialog';
import { QuizzEditComponent } from '../quizz-edit/quizz-edit.component';
import { QuizzDataService } from 'src/app/core/services/data/quizz-data.service';
import { WebSocketService } from 'src/app/core/services/data/web-socket.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit {

  @Input() quizzIndex: number;
  @Output() quizzDeleted: EventEmitter<number> = new EventEmitter();
  @Output() quizzUpdated: EventEmitter<any> = new EventEmitter();

  @Input() quizz: Quizz;

  public tabResult: [{position:number, email:string, score: number}]
  public displayedColumns: string[] = ['Position', 'Email', 'Score'];
  public fin = false;

  constructor(private _quizzData: QuizzDataService,
    public dialog: MatDialog,public webSocketService : WebSocketService) { }

  ngOnInit(): void {

  }

  onShowEditQuizz(): void {
    const dialogRef = this.dialog.open(QuizzEditComponent, {
      data: {
        quizz: this.quizz,
        editMode: true
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._quizzData.update(result).subscribe(
          (updatedQuizz) => {
            this.quizzUpdated.emit({ quizz: updatedQuizz, index: this.quizzIndex });
          },
          (error) => {
            console.log("EEROR : ", error);
          }
        )
      }
    });
  }

  onDeleteQuizz() {
    this._quizzData.deleteById(this.quizz._id).subscribe(
      (res) => {
        this.quizzDeleted.emit(this.quizzIndex);
      },
      (error) => {
        console.log("ERROR : ", error);
      }
    )
  }


  onConnectAdmin(){

    this.webSocketService.connect('startQuizz');

    //envoi de notre objet quizz afin d'etre distribuer a tout les joeur.
    this.webSocketService.emit('quizz',this.quizz);

    /*this.webSocketService.listen('message')
      .subscribe((message)=>{
        console.log(message)
      })*/
  
    this.webSocketService.listen('resultat')
     .subscribe((tabResultat : [{position:number, email:string, score: number}])=>{
       this.tabResult = tabResultat;
       this.fin = true;
        console.log(tabResultat);
        this.webSocketService.close();
      })  

  }


  onBackToQuizz(){
    this.fin = false;    
  }

}
