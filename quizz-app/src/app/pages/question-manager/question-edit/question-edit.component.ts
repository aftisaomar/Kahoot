import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Question } from 'src/app/shared/models/question.model';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit {

  questionEditForm: FormGroup;
  editMode: boolean;
  question: Question;
  error: boolean = false;
  errorMsg: string = '';

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuestionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
          console.log(this.data)
     }

  ngOnInit(): void {
    this.question = this.data.question;
    this.editMode = this.data.editMode;
    this.questionEditForm = this.fb.group({
      contenu: [this.question ? this.question.contenu : '', [Validators.required]],
      reponse: [this.question ? this.question.reponse : '', [Validators.required]],
      proposition1: [this.question ? this.question.proposition1 : '', [Validators.required]],
      proposition2: [this.question ? this.question.proposition2 : '', [Validators.required]],
      proposition3: [this.question ? this.question.proposition3 : '', [Validators.required]],
      proposition4: [this.question ? this.question.proposition4 : '', [Validators.required]],
      quizzId: [this.data.quizzId ? this.data.quizzId : '', [Validators.required]]
    });
  }

  onSave() {
    if (this.editMode)
      this.question = { _id: this.data.question._id, ...this.questionEditForm.value };
    else this.question = { ...this.questionEditForm.value }
    this.dialogRef.close(this.question)
  }
}
