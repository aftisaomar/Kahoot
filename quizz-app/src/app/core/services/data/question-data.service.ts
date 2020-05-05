import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';
import { Quizz } from 'src/app/shared/models/quizz.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionDataService {

  constructor(private http: HttpClient) { }

  // Ajouter un nouveau quizz
  add(questionData: any) {
    console.log("SERVICE ADD : ", questionData)
    return this.http.post<any>(`${API_URL}/questions`, questionData);
  }

  /*findAll() {
    return this.http.get<Quizz[]>(`${API_URL}/questions`);
  }*/

  deleteById(id: string) {
    return this.http.delete(`${API_URL}/questions/${id}`);
  }

  update(questionData: any) {
    console.log("SERVICE UPDATE : ", questionData)
    const updatedQuizz = { titre: questionData.titre, description: questionData.description }
    return this.http.patch(`${API_URL}/questions/${questionData._id}`, updatedQuizz);
  }

}
