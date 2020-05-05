import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/models/question.model';
import { QuizzDataService } from 'src/app/core/services/data/quizz-data.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionEditComponent } from './question-edit/question-edit.component';
import { Quizz } from 'src/app/shared/models/quizz.model';
import { QuestionDataService } from 'src/app/core/services/data/question-data.service';

@Component({
  selector: 'app-question-manager',
  templateUrl: './question-manager.component.html',
  styleUrls: ['./question-manager.component.scss']
})
export class QuestionManagerComponent implements OnInit {

  questions: Question[] = [];
  quizzes: Quizz[] = [];

  constructor(private _quizzData: QuizzDataService,
    private _questionData: QuestionDataService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this._quizzData.findAll().subscribe(
      (quizzes) => {
        this.quizzes = quizzes;
        quizzes.map(quizz => {
          quizz.questions.forEach(q => this.questions.push({ ...q, quizzId: quizz._id }));
        })

      },
      (error) => {
        console.log("Error : ", error);
      }
    )
  }

  onShowEditQuestion(i: number) {
    const dialogRef = this.dialog.open(QuestionEditComponent, {
      width: '50%',
      data: {
        question: this.questions[i],
        editMode: true,
        quizzes: this.quizzes
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(questionData => {
      if (questionData) {
        this._questionData.update(questionData).subscribe(
          (newQuestion: Question) => {
            console.log(newQuestion)
            this.questions.push({ _id: questionData.quizzId, ...newQuestion });
          },
          (error) => {
            console.log("Error : ", error);
          }
        );
      }
    });
  }

  onShowAddQuestion() {
    const dialogRef = this.dialog.open(QuestionEditComponent, {
      width: '50%',
      data: {
        question: null,
        editMode: false,
        quizzes: this.quizzes
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(questionData => {
      if (questionData) {
        this._questionData.add(questionData).subscribe(
          (newQuestion) => {
            this.questions.push({ _id: questionData.quizzId, ...newQuestion });
          },
          (error) => {
            console.log("Error : ", error);
          }
        );
      }
    });
  }

  onDeleteQuestion(i: number) {
    this._questionData.deleteById(this.questions[i]._id).subscribe(
      (res) => {
        this.questions.splice(i, 1);
      },
      (error) => {
        console.log("ERROR : ", error);
      }
    )
  }

}
