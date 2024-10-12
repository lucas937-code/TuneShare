import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Playlist} from "../types";
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {SpotifyService} from "../spotify.service";
import {switchMap} from "rxjs";
import {AppleMusicService} from "../apple-music.service";

@Component({
  selector: 'app-add-playlist',
  standalone: true,
  imports: [
    NgClass,
    PlaylistListComponent,
    NgIf
  ],
  templateUrl: './add-playlist.component.html',
  styleUrl: './add-playlist.component.scss'
})
export class AddPlaylistComponent implements OnInit {

  spotify: boolean = true;
  empty: boolean = false;
  linkedSpotify: boolean = true; //TODO Abfrage
  linkedApplemusic: boolean = true;  //TODO Abfrage
  playlistsSpotify: Playlist[] = [];
  playlistsApplemusic: Playlist[] = [];

  constructor(private spotifyService: SpotifyService, private appleMusicService: AppleMusicService) {
  }

  ngOnInit() {
    this.spotifyService.getCurrentUser().pipe(switchMap(current_user => {
      return this.spotifyService.getPlaylists(current_user.id)
    })).subscribe({
      next: playlists => {
        this.playlistsSpotify = this.sortPlaylistsAlphabetically(playlists);
        this.empty = this.playlistsSpotify.length == 0;
      }
    });


    this.appleMusicService.getPlaylists().subscribe(({
      next: playlists => {
        this.playlistsApplemusic = this.sortPlaylistsAlphabetically(playlists);
        this.empty = this.playlistsApplemusic.length == 0;
      }
    }));

    this.spotifyActive();
  }

  sortPlaylistsAlphabetically(playlists: Playlist[]) {
    return playlists.sort((a, b) => {
      const isNumberOrEmoji = (name: string) => /^[\d\p{Emoji}]/u.test(name.replace(/\s/g, ""));
      const aIsSpecial = isNumberOrEmoji(a.title);
      const bIsSpecial = isNumberOrEmoji(b.title);
      if (aIsSpecial && !bIsSpecial) {
        return 1;
      }
      if (!aIsSpecial && bIsSpecial) {
        return -1;
      }
      return a.title.replace(/\s/g, "").localeCompare(b.title.replace(/\s/g, ""));
    });
  }

  spotifyActive() {
    this.spotify = true;
    this.empty = this.playlistsSpotify.length === 0;
    console.log(this.playlistsSpotify[0]);
  }

  applemusicActive() {
    this.spotify = false;
    this.empty = this.playlistsApplemusic.length === 0;
  }
}
