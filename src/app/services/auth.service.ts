import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../app.config'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, credentials);
  }

  register(user: { fullName: string, username: string, email: string, password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }
}
