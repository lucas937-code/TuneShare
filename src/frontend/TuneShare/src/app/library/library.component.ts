import {Component, OnInit} from '@angular/core';
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {TuneShareService} from "../tune-share.service";
import {Observable, switchMap} from "rxjs";
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
  noPlaylists : boolean = false;

  constructor(private tuneshareService: TuneShareService) {}

  ngOnInit() {
    this.tuneshareService.getCurrentUser().pipe(switchMap(user => {
      return this.tuneshareService.getPlaylistsOfUser(user.id);
    })).subscribe(playlists => {
        this.playlists = this.playlists.concat(playlists).sort((a, b) => a.title.localeCompare(b.title));
        this.noPlaylists = this.playlists.length == 0;
      }
    );

    this.tuneshareService.getCurrentUser().pipe(switchMap(user => {
      return (this.tuneshareService.getFollowedPlaylistsOfUser());
    })).subscribe(playlists => {
        this.playlists = this.playlists.concat(playlists).sort((a, b) => a.title.localeCompare(b.title));
        this.noPlaylists = this.playlists.length == 0;
      }
    );
  }
}
