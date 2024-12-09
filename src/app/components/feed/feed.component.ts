import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TweetService } from '../../services/tweet.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  tweets: any[] = [];
  newTweet: string = '';
  userId: string = ''; // El ID del usuario logueado
  userName: string = ''; // El nombre del usuario logueado

  constructor(private tweetService: TweetService, private router: Router) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || ''; // Asegúrate de que el userId esté disponible
    this.userName = localStorage.getItem('userName') || ''; // Asegúrate de que el userName esté disponible
    this.loadFeed();
  }

  loadFeed(): void {
    if (this.userId) {
      this.tweetService.getFeed(this.userId).subscribe(
        data => {
          this.tweets = data;
        },
        error => {
          console.error('Error fetching feed:', error);
        }
      );
    }
  }

  postTweet(): void {
    if (this.userId && this.newTweet.length > 0 && this.newTweet.length <= 280) {
      this.tweetService.postTweet(this.userId, this.newTweet).subscribe(
        () => {
          this.newTweet = '';
          this.loadFeed();
        },
        error => {
          console.error('Error posting tweet:', error);
        }
      );
    }
  }
  

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName'); // Remover el nombre del usuario al cerrar sesión
    this.router.navigate(['/']);
  }
}
