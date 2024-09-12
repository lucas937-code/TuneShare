import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {PlaylistComponent} from "../playlist/playlist.component";
import {Playlist} from "../types";

@Component({
  selector: 'app-playlist-rotate',
  standalone: true,
  imports: [
    NgForOf,
    PlaylistComponent,
    NgClass
  ],
  templateUrl: './playlist-rotate.component.html',
  styleUrl: './playlist-rotate.component.scss'
})
export class PlaylistRotateComponent implements OnInit {
  @Input() title: string = "";
  @Input() playlists: Playlist[] = [];
  playlistChunks: Playlist[][] = [];

  ngOnInit(): void {
    this.playlistChunks = this.chunkArray(this.playlists, 3);
  }

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
