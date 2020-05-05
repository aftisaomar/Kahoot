import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionManagerComponent } from './question-manager.component';

const routes: Routes = [{ path: '', component: QuestionManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionManagerRoutingModule { }
