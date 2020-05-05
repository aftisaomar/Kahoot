import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountdownModule} from 'ngx-countdown'
import {MatCardModule} from '@angular/material/card'
import {MatTableModule} from '@angular/material/table';
import { QuizzRoomRoutingModule } from './quizz-room-routing.module';
import { NgMaterialModule } from 'src/app/shared/ng-material/ng-material.module';
import { QuizzRoomComponent } from './quizz-room.component';



@NgModule({
  declarations: [QuizzRoomComponent],
  imports: [
    CommonModule,
    QuizzRoomRoutingModule,
    MatCardModule,
    CountdownModule,
    MatTableModule,
    NgMaterialModule
  ]
})
export class QuizzRoomModule { }
