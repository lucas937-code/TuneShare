import {Component, OnInit} from '@angular/core';
import {BACKEND_URL} from "../../main";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {SpotifyService} from "../spotify.service";
import {AppleMusicService} from "../apple-music.service";
import {switchMap} from "rxjs";
import {TuneShareService} from "../tune-share.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})

// settings page (/settings)
export class SettingsComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private spotifyService: SpotifyService,
              private appleMusicService: AppleMusicService, private tuneShareService: TuneShareService) {
  }

  checkbox: boolean = false;
  code: string | null = null;
  linkedSpotify: boolean = false;
  linkedAppleMusic: boolean = false;

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.code = params.get('code');
      if (this.code) {
        this.http.get(`${BACKEND_URL}service/spotify/?action=callback&code=${this.code}`).pipe(switchMap(() => {
            return this.tuneShareService.linkedServices()
        }
        )).subscribe(linkedServices => {
          this.linkedSpotify = linkedServices.spotify;
          this.linkedAppleMusic = linkedServices.apple_music;
        });
      }
    });

    this.tuneShareService.linkedServices().subscribe(linkedServices => {
      this.linkedSpotify = linkedServices.spotify;
      this.linkedAppleMusic = linkedServices.apple_music;
    });
  }

  linkSpotify() {
    this.spotifyService.authorizeUser().pipe(switchMap(() => {
      return this.tuneShareService.linkedServices()
    })).subscribe(linkedServices => {
      this.linkedSpotify = linkedServices.spotify;
      this.linkedAppleMusic = linkedServices.apple_music;
    });
  }

  linkAppleMusic() {
    this.appleMusicService.initialize()
      .pipe(switchMap(() => {
        return this.appleMusicService.authorizeUser();
      })).pipe(switchMap(() => {
        return this.tuneShareService.linkedServices()
    })).subscribe({
        next: linkedServices => {
          this.linkedSpotify = linkedServices.spotify;
          this.linkedAppleMusic = linkedServices.apple_music;
        },
        error: err => console.error('Failed to authorize user', err)
      });
  }

  removeAppleMusicLink() {
    this.appleMusicService.removeAppleMusicLink().subscribe(() => this.linkedAppleMusic = false);
  }

  removeSpotifyLink() {
    this.spotifyService.removeSpotifyLink().subscribe(() => this.linkedSpotify = false);
  }
}
