import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzManagerRoutingModule } from './quizz-manager-routing.module';
import { QuizzManagerComponent } from './quizz-manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from 'src/app/shared/ng-material/ng-material.module';
import { QuizzComponent } from './quizz/quizz.component';
import { QuizzEditComponent } from './quizz-edit/quizz-edit.component';


@NgModule({
  declarations: [QuizzManagerComponent, QuizzComponent, QuizzEditComponent],
  imports: [
    CommonModule,
    QuizzManagerRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    NgMaterialModule
  ]
})
export class QuizzManagerModule { }
