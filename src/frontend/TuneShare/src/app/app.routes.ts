import { Routes } from '@angular/router';
import {PlaylistListComponent} from "./playlistList/playlist-list.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {RegistrationComponent} from "./authentication/registration/registration.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {SettingsComponent} from "./settings/settings.component";
import {PlaylistviewComponent} from "./playlistview/playlistview.component";
import {LoginComponent} from "./authentication/login/login.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {AddPlaylistComponent} from "./add-playlist/add-playlist.component";
import {FollowedListComponent} from "./followed-list/followed-list.component";

export const routes: Routes = [
  { path: "library", component: PlaylistListComponent, data : { title: 'Library' } },
  { path: "", component: HomepageComponent },
  { path: "register", component: RegistrationComponent},
  { path: "login", component: LoginComponent},
  { path: "profile", component: UserProfileComponent },
  { path: "settings", component: SettingsComponent },
  { path: "playlist", component: PlaylistviewComponent },
  { path: "search", component: SearchResultsComponent },
  { path: "addplaylist", component: AddPlaylistComponent },
  { path: "followed", component: FollowedListComponent },
];
