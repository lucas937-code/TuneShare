import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaylistComponent} from "../playlist/playlist.component";
import {Playlist} from "../types";

@Component({
  selector: 'app-playlistList',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    PlaylistComponent
  ]
})
export class PlaylistListComponent {
  @Input() playlists: Playlist[] = [];

  playlistDeleted(playlist: Playlist, event: boolean) {
    if (event) {
      const index = this.playlists.indexOf(playlist);
      if (index != -1)
        this.playlists.splice(index, 1);
    }
  }
}
