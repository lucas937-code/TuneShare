import {Component, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {PlaylistService} from "../playlist.service";
import {PlaylistComponent} from "../playlist/playlist.component";
import {PlaylistRotateComponent} from "../playlist-rotate/playlist-rotate.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    PlaylistComponent,
    PlaylistRotateComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  playlists: any[] = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlists = this.playlistService.getPlaylists();
  }
}
