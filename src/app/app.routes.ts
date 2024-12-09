import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FeedComponent } from './components/feed/feed.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowComponent } from './components/follow/follow.component'; 

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'feed', component: FeedComponent },
  { path: 'profile/:userName', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:userName/followers', component: FollowComponent },
  { path: 'profile/:userName/following', component: FollowComponent },
];
