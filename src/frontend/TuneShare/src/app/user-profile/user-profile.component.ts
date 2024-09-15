import {Component, HostListener, Input} from '@angular/core';
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PlaylistComponent} from "../playlist/playlist.component";
import {PlaylistService} from "../playlist.service";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    PlaylistListComponent,
    NgForOf,
    PlaylistComponent,
    NgIf,
    NgClass,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  // @Input() user: User = ;    Nutzer injizieren und Variablen anpassen
  id: number = 0;
  spotify_id: string | undefined;
  apple_music_id: string | undefined;
  date_created: Date = new Date("2000-02-02");
  username: string = "Max Mustermannn";
  display_name: string = "Max_2000";

  playlists: any[] = [];
  isPlaylistsTransformed = false;
  isFriendsTransformed = false;
  isShrunk = false;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
  }

  toggleTransformPlaylists() {
    this.isPlaylistsTransformed = !this.isPlaylistsTransformed;
  }

  toggleTransformFriends() {
    this.isFriendsTransformed = !this.isFriendsTransformed;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isShrunk = window.scrollY > 0;
  }
}
