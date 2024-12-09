import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowersService {
  private apiUrl = 'http://localhost:8080/api/Followers';  

  constructor(private http: HttpClient) { }

  getFollowers(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/followers/${userId}`);
  }

  getFollowing(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/following/${userId}`);
  }


  isFollowing(userId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/users/${userId}/is-following`);
  }

  follow(userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users/${userId}/follow`, {});
  }

  unfollow(userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users/${userId}/unfollow`, {});
  }
}
