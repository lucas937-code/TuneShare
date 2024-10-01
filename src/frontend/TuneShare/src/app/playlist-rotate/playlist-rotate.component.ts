import {Component, HostListener, Input, OnInit} from '@angular/core';
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
  @Input() carouselId: string = "";
  playlistChunks: Playlist[][] = [];
  isMobile: boolean = false;

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 992;
    this.playlistChunks = this.chunkArray(this.playlists, this.isMobile ? 2 : 4);
  }

  chunkArray(arr: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
    this.playlistChunks = this.chunkArray(this.playlists, this.isMobile ? 2 : 4);
  }
}
