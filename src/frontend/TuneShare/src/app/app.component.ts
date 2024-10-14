import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {PlaylistService} from './playlist.service';
import {Playlist} from "./types";
import {AuthService} from "./authentication/shared/auth.service";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgIf, NgClass, NgForOf, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isRegistrationPage: boolean = false;
  isMobile: boolean = false;
  title = 'TuneShare';

  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService, private router: Router, protected authService: AuthService) {
    this.router.events.subscribe(() => {
      this.isRegistrationPage = this.router.url === '/register' || this.router.url === '/login';
    })
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;
  }

  submitSearch(f: NgForm) {
    console.log(f.value.inputSearch);
    window.location.href = "/search?input=" + f.value.inputSearch;
    f.resetForm();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
  }
}
