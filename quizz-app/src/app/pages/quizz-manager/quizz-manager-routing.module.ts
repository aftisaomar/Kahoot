import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizzManagerComponent } from './quizz-manager.component';

const routes: Routes = [{ path: '', component: QuizzManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzManagerRoutingModule { }
