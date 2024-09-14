import { Routes } from '@angular/router';
import {PlaylistListComponent} from "./playlistList/playlist-list.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {RegistraionComponent} from "./registraion/registraion.component";

export const routes: Routes = [
  { path: "library", component: PlaylistListComponent, data : { title: 'Library' } },
  { path: "", component: HomepageComponent },
  { path: "register", component: RegistraionComponent}
];
