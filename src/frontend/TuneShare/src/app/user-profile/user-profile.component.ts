import {Component, HostListener, Input, OnInit} from '@angular/core';
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PlaylistComponent} from "../playlist/playlist.component";
import {PlaylistService} from "../playlist.service";
import {User} from "../types";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    PlaylistListComponent,
    NgForOf,
    PlaylistComponent,
    NgIf,
    NgClass,
    NgbTooltip,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  @Input() user: User = {
    id: 0,
    spotify_id: "MaxAverageListeningEnjoyer",
    apple_music_id: undefined,
    date_created: new Date("2000-02-02"),
    username: "Max_2000",
    display_name: "Max Mustermannn",
  }

  playlists: any[] = [];
  isPlaylistsTransformed: boolean = false;
  isFriendsTransformed: boolean = false;
  isShrunk: boolean = false;
  isHidden: boolean = false;
  followed: boolean = false; //True = Nutzer wird bereits gefolgt
  newFollow: boolean = this.followed;
  ownProfile: boolean = false; //True = Nutzer sieht sein eigenes Profil an
  isMobile: boolean = true;

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.playlists = this.playlistService.getPlaylists();
    this.isMobile = window.innerWidth < 992;
  }

  toggleTransformPlaylists() {
    this.isPlaylistsTransformed = !this.isPlaylistsTransformed;
  }

  toggleTransformFriends() {
    this.isFriendsTransformed = !this.isFriendsTransformed;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 0) {
      this.isShrunk = window.scrollY > 0;
      setTimeout(() => {
        this.isHidden = this.isShrunk
      }, 100);
    } else {
      setTimeout(() => {
        this.isHidden = window.scrollY > 0;
        setTimeout(() => {
          this.isShrunk = this.isHidden = window.scrollY > 0;
        }, 1);
      }, 5)
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
  }

  follow() {
    this.followed = !this.followed;
    setTimeout(() => {
      this.newFollow = this.followed;
    }, 100);
  }
}
