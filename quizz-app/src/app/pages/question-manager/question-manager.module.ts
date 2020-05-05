import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionManagerRoutingModule } from './question-manager-routing.module';
import { QuestionManagerComponent } from './question-manager.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgMaterialModule } from 'src/app/shared/ng-material/ng-material.module';
import { QuestionEditComponent } from './question-edit/question-edit.component';


@NgModule({
  declarations: [QuestionManagerComponent, QuestionEditComponent],
  imports: [
    CommonModule,
    QuestionManagerRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule
  ]
})
export class QuestionManagerModule { }
