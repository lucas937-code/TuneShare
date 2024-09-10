import { Routes } from '@angular/router';
import {PlaylistListComponent} from "./playlistList/playlist-list.component";
import {HomepageComponent} from "./homepage/homepage.component";

export const routes: Routes = [
  { path: "library", component: PlaylistListComponent, data : { title: 'Library' } },
  { path: "", component: HomepageComponent },
];
