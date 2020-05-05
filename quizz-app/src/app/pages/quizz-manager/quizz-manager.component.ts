import { Component, OnInit } from '@angular/core';
import { QuizzDataService } from 'src/app/core/services/data/quizz-data.service';
import { Quizz } from 'src/app/shared/models/quizz.model';
import { MatDialog } from '@angular/material/dialog';
import { QuizzEditComponent } from './quizz-edit/quizz-edit.component';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-quizz-manager',
  templateUrl: './quizz-manager.component.html',
  styleUrls: ['./quizz-manager.component.scss']
})
export class QuizzManagerComponent implements OnInit {

  quizzes: Quizz[] = [];

  constructor(private _quizzData: QuizzDataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this._quizzData.findAll().subscribe(
      (quizzes: Quizz[]) => {
        this.quizzes = quizzes;
      },
      (error) => {
        console.log("ERROR : ", error);
      }
    )
  }

  onShowAddQuizz(): void {
    const dialogRef = this.dialog.open(QuizzEditComponent, {
      data: {
        quizz: null,
        editMode: false
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(quizzData => {
      if (quizzData) {
        this._quizzData.add(quizzData).subscribe(
          (newQuizz) => {
            this.quizzes.push(newQuizz);
          },
          (error) => {
            console.log("Error : ", error);
          }
        );
      }
    });
  }

  onQuizzDeleted(index: number) {
    this.quizzes.splice(index, 1);
  }

  onQuizzUpdated(data: any) {
    this.quizzes[data.index].titre = data.quizz.titre;
    this.quizzes[data.index].description = data.quizz.description;
  }

}
