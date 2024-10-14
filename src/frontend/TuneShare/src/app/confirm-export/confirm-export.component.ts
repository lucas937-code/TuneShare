import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {SpotifyService} from "../spotify.service";
import {Playlist} from "../types";
import {map, Observable, of, tap} from "rxjs";

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
  @Input() id: HTMLDivElement | undefined;
  stage: "confirm" | "running" | "success" | "failed" = "confirm";

  constructor(private spotifyService: SpotifyService) {
  }

  ngAfterViewInit() {

    if (this.id) {
      this.id.addEventListener('hidden.bs.modal', (event) => {
        this.stage = "confirm";
      });
    }
  }

  export() {
    this.stage = "running";
    if (this.spotify) {
      this.exportToSpotify().subscribe(stage => this.stage = stage);
    } else {
      this.stage = this.exportToApplemusic();
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

  exportToApplemusic(): "success" | "failed"  {
    let success: boolean = true;
    return success ? "success" : "failed";
  }
}
