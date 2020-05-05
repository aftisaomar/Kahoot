import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizzRoomComponent } from './quizz-room.component';

const routes: Routes = [{ path: '', component: QuizzRoomComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzRoomRoutingModule { }
