import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PlaylistComponent} from "../playlist/playlist.component";
import {PlaylistRotateComponent} from "../playlist-rotate/playlist-rotate.component";
import {TuneShareService} from "../tune-share.service";
import {switchMap} from "rxjs";
import {Playlist, User} from "../types";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    PlaylistComponent,
    PlaylistRotateComponent,
    NgIf
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  ownPlaylists: any[] = [];
  followerWithPlaylists: User[] = []

  constructor(private tuneshareService: TuneShareService) {}

  ngOnInit(): void {
    this.tuneshareService.getCurrentUser().pipe(switchMap(user => {
      return this.tuneshareService.getPlaylistsOfUser(user.id);
    })).subscribe({
      next: playlists => {
        this.ownPlaylists = playlists;
      }
    });
  }
}
