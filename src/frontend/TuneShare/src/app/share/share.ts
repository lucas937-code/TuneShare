import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SpotifyService} from "../spotify.service";
import {AppleMusicService} from "../apple-music.service";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Track} from "../types";

@Component({
  selector: 'app-share',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './share.html',
  styleUrl: './share.scss'
})
export class Share implements OnInit {

  trackId: string | undefined;
  found : boolean = true;
  urlInput : string = '';
  spotifyLink : string = '';
  applemusicLink : string = '';
  track : Track | undefined;

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private applemusicService: AppleMusicService) {}

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          this.trackId = this.extractIdFromUrl(params['url']);
          if (!this.trackId) {}
          else if (params['url'].toLowerCase().includes('open.spotify.com')) {
            this.spotifyLink = "https://open.spotify.com/intl-de/track/"+this.trackId
            this.getApplemusicLink(this.trackId);
            return;
          } else if (params['url'].toLowerCase().includes('music.apple.com')) {
            this.applemusicLink = "https://music.apple.com/de/song/"+this.trackId;
            this.getSpotifyLink(this.trackId);
            return;
          }
          this.found = false;
          return;
        }
      );
  }

  getApplemusicLink(id: string) {
    this.spotifyService.getTrackById(id).subscribe(track => {
      this.track = track;
      this.applemusicService.findTrack(track.artist, track.title).subscribe(foundTrack => {
        this.applemusicLink = "https://music.apple.com/de/song/" + foundTrack.id;
        this.found = foundTrack.id != undefined;
      })
    });
  }

  getSpotifyLink(id: string) {
    this.applemusicService.getTrackById(id).subscribe(track => {
      this.track = track;
      this.spotifyService.findTrack(track.artist, track.title).subscribe(foundTrack => {
        this.spotifyLink = "https://open.spotify.com/intl-de/track/" + foundTrack.id;
        this.found = foundTrack.id != undefined;
      });
    })
  }

  extractIdFromUrl(url: string): string | undefined {
    const decodedUrl = decodeURIComponent(url);
    const lastEqualIndex = decodedUrl.lastIndexOf('/');
    if (lastEqualIndex != -1) {
      let result = decodedUrl.substring(lastEqualIndex + 1);
      let removeSpotify = result.lastIndexOf('?si');
      let removeApple = result.lastIndexOf('i=');
      if (removeSpotify != -1) {
        result =  result.substring(0, result.lastIndexOf('?si')).trim();
      } else if (removeApple != -1) {
        result =  result.substring(result.lastIndexOf('i=') + 2);
      }
      return result
    }
    return undefined;
  }

  submitUrl(f: NgForm){
    window.location.href = "/share?url=" + f.value.urlInput;
  }
}
