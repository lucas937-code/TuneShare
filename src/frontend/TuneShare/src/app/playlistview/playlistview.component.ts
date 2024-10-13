import {Component, HostListener, OnInit} from '@angular/core';
import {PlaylistComponent} from "../playlist/playlist.component";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmExportComponent} from "../confirm-export/confirm-export.component";
import {playlistType, Track} from "../types";
import {SpotifyService} from "../spotify.service";
import {AppleMusicService} from "../apple-music.service";
import {ActivatedRoute} from "@angular/router";
import {TuneShareService} from "../tune-share.service";

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

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private applemusicService: AppleMusicService, private tuneshareService: TuneShareService) {}

  currentPlaylist: any;

  added: boolean = false;
  isMobile: boolean = false;
  type: playlistType = "ts";
  id_type: string | number = -1;
  tracks: Track[] | undefined;

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;
    this.route.queryParams.subscribe(params => {
      this.type = params['type'];
      this.id_type = params['playlist'];
      switch (this.type) {
        case "ts": {
          this.tuneshareService.getPlaylist(params['playlist']).subscribe({
            next: playlist => {
              this.currentPlaylist = playlist;
              this.tracks = this.currentPlaylist.track_list;
            }
          });
          break;
        }
        case "am": {
          this.applemusicService.getPlaylist(params['playlist']).subscribe({
            next: playlist => {
              this.currentPlaylist = playlist;
              this.tracks = this.currentPlaylist.track_list;
            }
          });
          break;
        }
        case "sp": {
          this.spotifyService.getPlaylist(params['playlist']).subscribe({
            next: playlist => {
              this.currentPlaylist = playlist;
              this.tracks = this.currentPlaylist.track_list;
            }
          })
          break;
        }
      }
    });
  }

  add(){
    this.added = !this.added;

    if (this.currentPlaylist.apple_music_id)
      this.applemusicService.importFromAppleMusic(this.currentPlaylist.apple_music_id).subscribe();
    if (this.currentPlaylist.spotify_id)
      this.spotifyService.importFromSpotify(this.currentPlaylist.spotify_id).subscribe();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href); //TODO add link to specific playlist
  }
}
