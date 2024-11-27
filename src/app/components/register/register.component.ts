import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  fullName: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    const user = { fullName: this.fullName, username: this.username, email: this.email, password: this.password };
    this.authService.register(user).subscribe(
      (response: any) => {
        // manejar la respuesta
      },
      (error: any) => {
        // manejar el error
      }
    );
  }
}
