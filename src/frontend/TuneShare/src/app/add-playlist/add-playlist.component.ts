import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgClass} from "@angular/common";
import {Playlist} from "../types";
import {PlaylistListComponent} from "../playlistList/playlist-list.component";

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
export class AddPlaylistComponent implements OnInit{

  spotify : boolean = true;
  foundPlaylists: Playlist[] = [
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
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams
        .subscribe(params => {
            if (params['type'] == "applemusic"){
              this.spotify = false;
            }
          }
        );
  }
}
