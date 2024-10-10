import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PlaylistService} from "../playlist.service";
import {PlaylistComponent} from "../playlist/playlist.component";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

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
export class PlaylistListComponent implements OnInit{
  playlists: any[] = [];
  @Input() headline: string = "Library";

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(){
    this.playlists = this.playlistService.getPlaylists();
  }
}
