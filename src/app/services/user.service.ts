import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/User';  // Ajuste de la URL base

  constructor(private http: HttpClient) { }

  // Método para registrar un nuevo usuario
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user); // POST /api/User/register
  }

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials); // POST /api/User/login
  }

  // Método para obtener el perfil de un usuario por su ID
  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Método para obtener el userId del usuario actualmente logueado (por ejemplo, usando el localStorage o el token)
  getUserIdFromLocalStorage(): string | null {
    return localStorage.getItem('userId');
  }
}
