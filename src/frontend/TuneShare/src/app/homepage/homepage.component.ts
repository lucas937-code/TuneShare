import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {PlaylistService} from "../playlist.service";
import {PlaylistComponent} from "../playlist/playlist.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    PlaylistComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  playlists: any[] = [];
  playlistChunks: any[] = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.playlists = this.playlistService.getPlaylists();
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
