import { Routes } from '@angular/router';
import {PlaylistListComponent} from "./playlistList/playlist-list.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

export const routes: Routes = [
  { path: "library", component: PlaylistListComponent, data : { title: 'Library' } },
  { path: "", component: HomepageComponent },
  { path: "profile", component: UserProfileComponent },
];
