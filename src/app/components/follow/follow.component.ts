import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowersService } from '../../services/followers.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-follow',
  standalone: true, // Marca el componente como standalone
  imports: [CommonModule, RouterModule], // Asegúrate de importar CommonModule y RouterModule
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  followers: any[] = [];
  following: any[] = [];
  userId: string = '';
  userName: string = '';  // Agregar esta línea para obtener el username
  selectedTab: 'followers' | 'following' = 'followers';  // Control de la pestaña activa

  constructor(
    private followersService: FollowersService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userId = this.userService.getUserIdFromLocalStorage() || '';  // Recuperamos el userId
    this.userName = localStorage.getItem('userName') || '';  // Recuperamos el username del localStorage
    this.loadFollowersAndFollowing();
  }

  // Cargar seguidores y seguidos
  loadFollowersAndFollowing(): void {
    if (this.userId) {
      this.followersService.getFollowers(this.userId).subscribe(
        (data) => {
          console.log('Followers:', data); // Imprimir los datos para verificar su estructura
          this.followers = data;
        },
        (error) => {
          console.error('Error fetching followers:', error);
        }
      );

      this.followersService.getFollowing(this.userId).subscribe(
        (data) => {
          console.log('Following:', data); // Imprimir los datos para verificar su estructura
          this.following = data;
        },
        (error) => {
          console.error('Error fetching following:', error);
        }
      );
    }
  }

  // Cambiar la pestaña activa
  switchTab(tab: 'followers' | 'following'): void {
    this.selectedTab = tab;
  }

  // Seguir/deseguir a un usuario
  toggleFollow(userId: string): void {
    if (this.following.includes(userId)) {
      this.unfollow(userId);
    } else {
      this.follow(userId);
    }
  }

  // Seguir a un usuario
  follow(userId: string): void {
    this.followersService.follow(this.userId).subscribe(
      () => {
        this.loadFollowersAndFollowing();  // Recargar las listas después de seguir
      },
      (error) => {
        console.error('Error following user:', error);
      }
    );
  }

  // Dejar de seguir a un usuario
  unfollow(userId: string): void {
    this.followersService.unfollow(this.userId).subscribe(
      () => {
        this.loadFollowersAndFollowing();  // Recargar las listas después de dejar de seguir
      },
      (error) => {
        console.error('Error unfollowing user:', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName'); // Remover el nombre del usuario al cerrar sesión
    this.router.navigate(['/']);
  }
}
