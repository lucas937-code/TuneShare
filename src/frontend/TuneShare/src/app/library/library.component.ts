import { Component } from '@angular/core';
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {Playlist} from "../types";
import {PlaylistService} from "../playlist.service";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    PlaylistListComponent
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {
  constructor(private playlistService: PlaylistService) {}

  playlists: Playlist[] = this.playlistService.getPlaylists();  //TODO Ersetzen durch User Playlists
}
