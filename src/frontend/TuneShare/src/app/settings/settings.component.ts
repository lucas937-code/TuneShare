import {Component, OnInit} from '@angular/core';
import {BACKEND_URL} from "../../main";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {SpotifyService} from "../spotify.service";
import {AppleMusicService} from "../apple-music.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private spotifyService: SpotifyService,
              private appleMusicService: AppleMusicService) {
  }

  checkbox: boolean = false;
  code: string | null = null;

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.code = params.get('code');
      if (this.code) {
        this.http.get(`${BACKEND_URL}service/spotify/?action=callback&code=${this.code}`)
          .subscribe()
      }
    });
  }

  saveSettings() {
    //TODO implement
  }

  linkSpotify() {
    this.spotifyService.authorizeUser().subscribe();
  }

  async linkAppleMusic() {
    // this.appleMusicService.initialize()
    //   .pipe(switchMap(() => {
    //     return this.appleMusicService.authorizeUser();
    //   })).subscribe({
    //     error: err => console.error('Failed to authorize user', err)
    //   });

    this.appleMusicService.getPlaylists().subscribe({
      next: playlists => console.log(playlists)
    });
  }
}
