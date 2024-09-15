import {Component, HostListener, Input} from '@angular/core';
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PlaylistComponent} from "../playlist/playlist.component";
import {PlaylistService} from "../playlist.service";
import {User} from "../types";

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
  @Input() user: User = {
    id: 0,
    spotify_id: undefined,
    apple_music_id: undefined,
    date_created: new Date("2000-02-02"),
    username: "Max Mustermannn",
    display_name: "Max_2000",
  }

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
