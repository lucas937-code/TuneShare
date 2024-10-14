import {Component, HostListener, Input, OnInit} from '@angular/core';
import {PlaylistComponent} from "../playlist/playlist.component";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmExportComponent} from "../confirm-export/confirm-export.component";
import {playlistType, Track, User} from "../types";
import {SpotifyService} from "../spotify.service";
import {AppleMusicService} from "../apple-music.service";
import {ActivatedRoute} from "@angular/router";
import {TuneShareService} from "../tune-share.service";
import {switchMap} from "rxjs";

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
  user: User | undefined
  disable:boolean = false;
  added: boolean = false;
  show:boolean = false;
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
              this.tuneshareService.getUser(playlist.owner_id).subscribe(user => this.user = user);
              this.checkAdded();
            }
          });
          break;
        }
        case "am": {
          this.applemusicService.getPlaylist(params['playlist']).subscribe({
            next: playlist => {
              this.currentPlaylist = playlist;
              this.tracks = this.currentPlaylist.track_list;
              this.checkAdded();
            }
          });
          break;
        }
        case "sp": {
          this.spotifyService.getPlaylist(params['playlist']).subscribe({
            next: playlist => {
              this.currentPlaylist = playlist;
              this.tracks = this.currentPlaylist.track_list;
              this.checkAdded();
            }
          })
          break;
        }
      }
    });
  }

  add() {
    if (!this.disable){
      if (this.currentPlaylist.apple_music_id){
        this.applemusicService.importFromAppleMusic(this.currentPlaylist.apple_music_id).subscribe();
        this.added = true;
      }
      else if (this.currentPlaylist.spotify_id) {
        this.spotifyService.importFromSpotify(this.currentPlaylist.spotify_id).subscribe();
        this.added = true;
      }
      else if (this.currentPlaylist.id) {
        if (!this.added) {
          this.tuneshareService.followPlaylist(this.currentPlaylist.id).subscribe();
          this.added = true;
        } else {
          this.tuneshareService.unfollowPlaylist(this.currentPlaylist.id).subscribe();
          this.added = false;
        }
      }
    }
  }

  checkAdded(){
    this.tuneshareService.getCurrentUser().pipe(switchMap(user => {
      if (this.type == 'ts'){
        this.added = this.currentPlaylist.owner_id == user.id;
        this.show = true;
      }
      return this.tuneshareService.getPlaylistsOfUser(user.id);
    })).subscribe(playlists => {
      if (this.type == "sp") {
        this.added = playlists.find(playlist => playlist.origin_id == this.currentPlaylist.spotify_id) != undefined;
        this.disable = this.added;
        this.show = true;
      } else if (this.type == "am"){
        this.added = playlists.find(playlist => playlist.origin_id == this.currentPlaylist.apple_music_id) != undefined;
        this.disable = this.added;
        this.show = true;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
  }

  copyLink() {
    navigator.clipboard.writeText(window.location.href); //TODO add link to specific playlist
  }
}
