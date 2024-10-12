import {Component, HostListener, OnInit} from '@angular/core';
import {PlaylistComponent} from "../playlist/playlist.component";
import {PlaylistService} from "../playlist.service";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmExportComponent} from "../confirm-export/confirm-export.component";
import {Track} from "../types";
import {SpotifyService} from "../spotify.service";
import {AppleMusicService} from "../apple-music.service";

@Component({
  selector: 'app-playlistview',
  standalone: true,
  imports: [
    PlaylistComponent,
    NgClass,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    NgbTooltip,
    NgbTooltipModule,
    ConfirmExportComponent
  ],
  templateUrl: './playlistview.component.html',
  styleUrl: './playlistview.component.scss'
})
export class PlaylistviewComponent implements OnInit {

  constructor(private playlistService: PlaylistService, private spotifyServie: SpotifyService, private applemusicService: AppleMusicService) {
  }

  currentPlaylist: any = this.playlistService.getPlaylists()[1];

  added: boolean = false;
  isMobile: boolean = false;

  tracks: Track[] = [

    {
      id: 1,
      spotify_id: "one",
      apple_music_id: "one",

      date_created: new Date("2024-06-06"),

      title: "My new Playlist",
      artist: "Newcomer",
      cover_url: "/assets/papagei-foto.jpg",
    },
    {
      id: 1,
      spotify_id: "one",
      apple_music_id: "one",

      date_created: new Date("2024-06-06"),

      title: "My new Playlist",
      artist: "Newcomer",
      cover_url: "/assets/papagei-foto.jpg",
    },
    {
      id: 1,
      spotify_id: "one",
      apple_music_id: "one",

      date_created: new Date("2024-06-06"),

      title: "My new Playlist",
      artist: "Newcomer",
      cover_url: "/assets/papagei-foto.jpg",
    },
  ];

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;
  }

  add(){
    this.added = !this.added;
    //Funktion zum Hinzufügen zur Mediathek
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href); //TODO add link to specific playlist
  }
}
