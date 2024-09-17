import { Routes } from '@angular/router';
import {PlaylistListComponent} from "./playlistList/playlist-list.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {RegistrationComponent} from "./registration/registration.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {SettingsComponent} from "./settings/settings.component";

export const routes: Routes = [
  { path: "library", component: PlaylistListComponent, data : { title: 'Library' } },
  { path: "", component: HomepageComponent },
  { path: "register", component: RegistrationComponent},
  { path: "profile", component: UserProfileComponent },
  { path: "settings", component: SettingsComponent },
];
