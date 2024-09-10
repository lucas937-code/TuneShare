import {Component, HostListener, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { PlaylistService } from './playlist.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgIf, NgClass, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isMobile: boolean = false;
  title = 'TuneShare';

  playlists: any[] = [];
  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this. isMobile = window.innerWidth < 992;
  }
}
