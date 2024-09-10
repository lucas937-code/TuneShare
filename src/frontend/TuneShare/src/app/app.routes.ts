import { Routes } from '@angular/router';
import {PlaylistListComponent} from "./playlistList/playlist-list.component";

export const routes: Routes = [
  { path: "library", component: PlaylistListComponent, data : { title: 'Library' } },
];
