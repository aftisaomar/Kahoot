import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './shared/components/error/error.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'quizz-manager', loadChildren: () => import('./pages/quizz-manager/quizz-manager.module').then(m => m.QuizzManagerModule) },
  { path: 'quizz-room', loadChildren: () => import('./pages/quizz-room/quizz-room.module').then(m => m.QuizzRoomModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'question-manager', loadChildren: () => import('./pages/question-manager/question-manager.module').then(m => m.QuestionManagerModule) },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
