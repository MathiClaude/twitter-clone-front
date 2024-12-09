import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private apiUrl = 'http://localhost:8080/api/Tweet';  // Ajuste de la URL base

  constructor(private http: HttpClient) { }

  getFeed(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}/feed`); // GET /api/Tweet/{userId}/feed
  }

  postTweet(userId: string, content: string): Observable<any> {
    const params = new HttpParams().set('content', content);
    return this.http.post<any>(`${this.apiUrl}/${userId}`, {}, { params }); // POST /api/Tweet/{userId} con el contenido como parámetro
  }
}
