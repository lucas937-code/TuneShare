import {Component, OnInit} from '@angular/core';
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {TuneShareService} from "../tune-share.service";
import {switchMap} from "rxjs";
import {Playlist} from "../types";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    PlaylistListComponent,
    NgIf
  ],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {

  playlists: Playlist[] = [];

  constructor(private tuneshareService: TuneShareService) {}

  ngOnInit() {
    this.tuneshareService.getCurrentUser().pipe(switchMap(user => {
      return this.tuneshareService.getPlaylistsOfUser(user.id);
    })).subscribe({
      next: playlists => {
        this.playlists = playlists;
      }
    });
  }
}
