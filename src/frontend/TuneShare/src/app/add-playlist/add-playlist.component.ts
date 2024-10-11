import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Playlist} from "../types";
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {SpotifyService} from "../spotify.service";
import {switchMap} from "rxjs";

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
  linkedApplemusic: boolean = false;
  playlistsSpotify: Playlist[] = [];
  playlistsApplemusic: Playlist[] = [];

  constructor(private spotifyService: SpotifyService) {
  }

  ngOnInit() {
    this.spotifyService.getCurrentUser().pipe(switchMap(current_user => {
      return this.spotifyService.getPlaylists(current_user.id)
    })).subscribe({
      next: playlists => this.playlistsSpotify = playlists
    });

    this.playlistsApplemusic = [
      {
        id: 9,
        owner_id: 109,
        spotify_id: undefined,
        apple_music_id: "pl.u-Vop9PVzl45",
        date_created: new Date("2023-03-14"),
        date_modified: new Date("2023-03-15"),
        title: "Road Trip",
        description: "The perfect playlist for your next adventure.",
        track_list: [41, 42, 43, 44, 45],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 10,
        owner_id: 110,
        spotify_id: "37i9dQZF1DXdPec7aLTmlC",
        apple_music_id: undefined,
        date_created: new Date("2023-10-02"),
        date_modified: new Date("2023-10-05"),
        title: "Throwback 90s",
        description: "Relive the 90s with these nostalgic hits.",
        track_list: [46, 47, 48, 49, 50],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 11,
        owner_id: 110,
        spotify_id: "37i9dQZF1DXdPec7aLTmlC",
        apple_music_id: undefined,
        date_created: new Date("2023-10-02"),
        date_modified: new Date("2023-10-05"),
        title: "Throwback 90s",
        description: "Relive the 90s with these nostalgic hits.",
        track_list: [46, 47, 48, 49, 50],
        cover_url: "/assets/papagei-foto.jpg"
      }
    ]

    this.spotifyActive()
  }

  spotifyActive() {
    this.spotify = true;
    this.empty = this.playlistsSpotify.length === 0;
  }

  applemusicActive() {
    this.spotify = false;
    this.empty = this.playlistsApplemusic.length === 0;
  }
}
