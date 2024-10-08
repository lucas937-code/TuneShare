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
export class PlaylistListComponent implements OnInit, OnDestroy {
  playlists: any[] = [];
  @Input() title: string = "Library";
  subscriptions: Subscription = new Subscription();

  constructor(private playlistService: PlaylistService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

