import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {SpotifyService} from "../spotify.service";
import {Playlist} from "../types";
import {map, Observable, of, tap} from "rxjs";
import {AppleMusicService} from "../apple-music.service";

@Component({
  selector: 'app-confirm-export',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './confirm-export.component.html',
  styleUrl: './confirm-export.component.scss'
})
export class ConfirmExportComponent implements AfterViewInit{

  @Input() spotify: boolean | undefined;
  @Input() currentPlaylist: Playlist | undefined;
  @Input() id: string | undefined;
  div: HTMLDivElement | undefined;
  stage: "confirm" | "running" | "success" | "failed" = "confirm";

  constructor(private spotifyService: SpotifyService, private appleMusicService: AppleMusicService) {
  }

  ngAfterViewInit() {
    if (this.id) {
      this.div = document.getElementById(this.id) as HTMLDivElement;
      this.div.addEventListener('hidden.bs.modal', (event) => {
        this.stage = "confirm";
      });
    }
  }

  export() {
    this.stage = "running";
    if (this.spotify) {
      this.exportToSpotify().subscribe(stage => this.stage = stage);
    } else {
      this.exportToApplemusic().subscribe(stage => this.stage = stage);
    }
  }

  exportToSpotify(): Observable<"success" | "failed"> {
    if (this.currentPlaylist?.id)
      return this.spotifyService.exportToSpotify(this.currentPlaylist.id).pipe(map(r => {
        if (r.snapshot_id) {
          return "success";
        }
        return "failed";
      }));
    else return of("failed");
  }

  exportToApplemusic(): Observable<"success" | "failed">  {
    if (this.currentPlaylist?.id)
      return this.appleMusicService.exportToAppleMusic(this.currentPlaylist.id).pipe(map(r => {
        if (r.data[0]) {
          return "success";
        }
        return "failed";
      }));
    else return of("failed");
  }
}
