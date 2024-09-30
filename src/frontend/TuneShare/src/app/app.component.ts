import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import { PlaylistService } from './playlist.service';
import {Playlist} from "./types";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgIf, NgClass, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isRegistrationPage: boolean = false;
  isMobile: boolean = false;
  title = 'TuneShare';

  playlists: Playlist[] = [];
  constructor(private playlistService: PlaylistService, private router: Router) {
    this.router.events.subscribe(() => {
      this.isRegistrationPage = this.router.url === '/register' || this.router.url === '/login';
    })
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
  }
}
