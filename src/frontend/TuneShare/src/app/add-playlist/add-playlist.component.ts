import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgClass} from "@angular/common";
import {Playlist} from "../types";
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {SpotifyService} from "../spotify.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-add-playlist',
  standalone: true,
  imports: [
    NgClass,
    PlaylistListComponent
  ],
  templateUrl: './add-playlist.component.html',
  styleUrl: './add-playlist.component.scss'
})
export class AddPlaylistComponent implements OnInit {

  spotify: boolean = true;
  playlists: Playlist[] = [];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          if (params['type'] == "applemusic") {
            this.spotify = false;
          }
        }
      );
    if (this.spotify) {
      this.spotifyService.getCurrentUser().pipe(switchMap(current_user => {
        return this.spotifyService.getPlaylists(current_user.id)
      })).subscribe({
        next: playlists => this.playlists = playlists
      });
    } else {

    }
  }
}
