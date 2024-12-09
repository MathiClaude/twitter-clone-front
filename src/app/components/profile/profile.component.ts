import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FollowersService } from '../../services/followers.service';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string = '';
  userId: string = '';
  name: string = '';
  followersCount: number = 0;
  followingCount: number = 0;
  isFollowing: boolean | null = null;  // Añadir esta propiedad

  constructor(
    private route: ActivatedRoute,
    private followersService: FollowersService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userName = params.get('userName') || '';
      this.userId = this.userService.getUserIdFromLocalStorage() || '';

      this.loadProfile();
      this.checkIfFollowing();
    });
  }

  loadProfile(): void {
    if (this.userId) {
      this.userService.getUserProfile(this.userId).subscribe(
        data => {
          this.name = data.name;
        },
        error => {
          console.error('Error fetching user profile:', error);
        }
      );

      this.followersService.getFollowers(this.userId).subscribe(
        data => {
          this.followersCount = data.length;
        },
        error => {
          console.error('Error fetching followers:', error);
        }
      );

      this.followersService.getFollowing(this.userId).subscribe(
        data => {
          this.followingCount = data.length;
        },
        error => {
          console.error('Error fetching following:', error);
        }
      );
    }
  }

  checkIfFollowing(): void {
    this.followersService.isFollowing(this.userId).subscribe(
      isFollowing => {
        this.isFollowing = isFollowing;
      },
      error => {
        console.error('Error checking following status:', error);
      }
    );
  }

  toggleFollow(): void {
    if (this.isFollowing) {
      this.followersService.unfollow(this.userId).subscribe(
        () => {
          this.isFollowing = false;
          this.followersCount--;
        },
        error => {
          console.error('Error unfollowing user:', error);
        }
      );
    } else {
      this.followersService.follow(this.userId).subscribe(
        () => {
          this.isFollowing = true;
          this.followersCount++;
        },
        error => {
          console.error('Error following user:', error);
        }
      );
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    this.router.navigate(['/']);
  }
}
