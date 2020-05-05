import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quizz } from 'src/app/shared/models/quizz.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quizz-edit',
  templateUrl: './quizz-edit.component.html',
  styleUrls: ['./quizz-edit.component.scss']
})
export class QuizzEditComponent implements OnInit {

  quizzEditForm: FormGroup;
  editMode: boolean;
  quizz: Quizz;
  error: boolean = false;
  errorMsg: string = '';

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<QuizzEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.quizz = this.data.quizz;
    this.editMode = this.data.editMode;
    this.quizzEditForm = this.fb.group({
      titre: [this.quizz ? this.quizz.titre : '', [Validators.required]],
      description: [this.quizz ? this.quizz.description : '', [Validators.required]],
    });
  }

  onSave() {
    if (this.editMode)
      this.quizz = { _id: this.data.quizz._id, ...this.quizzEditForm.value };
    else this.quizz = { ...this.quizzEditForm.value }
    this.dialogRef.close(this.quizz)
  }

}
