import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaylistService} from "../playlist.service";
import {PlaylistComponent} from "../playlist/playlist.component";
import {Playlist} from "../types";

@Component({
  selector: 'app-playlistList',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss'],
  standalone: true,
  imports: [
    NgForOf,
    PlaylistComponent
  ]
})
export class PlaylistListComponent{
  @Input() playlists: Playlist[] = [];
  @Input() headline: string = "Library";

}
