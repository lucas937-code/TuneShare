import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {RegistrationComponent} from "./authentication/registration/registration.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {SettingsComponent} from "./settings/settings.component";
import {PlaylistviewComponent} from "./playlistview/playlistview.component";
import {LoginComponent} from "./authentication/login/login.component";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {AddPlaylistComponent} from "./add-playlist/add-playlist.component";
import {FollowedListComponent} from "./followed-list/followed-list.component";
import {LibraryComponent} from "./library/library.component";
import {authGuard} from "./authentication/shared/auth-guard";

export const routes: Routes = [
  { path: "library", component: LibraryComponent, canActivate: [authGuard] },
  { path: "", component: HomepageComponent, canActivate: [authGuard] },
  { path: "register", component: RegistrationComponent},
  { path: "login", component: LoginComponent},
  { path: "profile", component: UserProfileComponent, canActivate: [authGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [authGuard] },
  { path: "playlist", component: PlaylistviewComponent, canActivate: [authGuard] },
  { path: "search", component: SearchResultsComponent, canActivate: [authGuard] },
  { path: "addplaylist", component: AddPlaylistComponent, canActivate: [authGuard] },
  { path: "followed", component: FollowedListComponent, canActivate: [authGuard] },
];
