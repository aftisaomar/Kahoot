import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';
import { Quizz } from 'src/app/shared/models/quizz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzDataService {

  constructor(private http: HttpClient) { }

  // Ajouter un nouveau quizz
  add(quizzData: any) {
    return this.http.post<any>(`${API_URL}/quizzes`, quizzData);
  }

  findAll() {
    return this.http.get<Quizz[]>(`${API_URL}/quizzes`);
  }

  deleteById(id: string) {
    return this.http.delete(`${API_URL}/quizzes/${id}`);
  }

  update(quizzData: any) {
    const updatedQuizz = { titre: quizzData.titre, description: quizzData.description }
    return this.http.patch(`${API_URL}/quizzes/${quizzData._id}`, updatedQuizz);
  }

}
