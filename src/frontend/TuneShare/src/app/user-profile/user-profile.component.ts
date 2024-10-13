import {Component, HostListener, Input, OnInit} from '@angular/core';
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PlaylistComponent} from "../playlist/playlist.component";
import {Playlist, User} from "../types";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute} from "@angular/router";
import {TuneShareService} from "../tune-share.service";

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
  user: User | undefined;

  playlists: Playlist[] = [];
  isShrunk: boolean = false;
  isHidden: boolean = false;
  followed: boolean = false;
  newFollow: boolean = this.followed;
  ownProfile: boolean = false;
  isMobile: boolean = true;

  constructor(private route : ActivatedRoute, private tuneshareService: TuneShareService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tuneshareService.getUser(params['p']).subscribe({
        next: user => {
          this.tuneshareService.getCurrentUser().subscribe({
            next: currentuser => {
              this.ownProfile = user.id == currentuser.id;
              this.user = user;
            }
          });
          this.tuneshareService.getPlaylistsOfUser(user.id).subscribe({
            next: playlists => {
              this.playlists = playlists;
            }
          })
          this.tuneshareService.getFollowedUsers().subscribe({
            next: users => {
              this.followed = this.newFollow = users.find(foundUser => foundUser.id == user.id) != undefined;
            }
          });
        }
      })
    });
    this.isMobile = window.innerWidth < 992;
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

  followAnimation() {
    this.followed = !this.followed;
    setTimeout(() => {
      this.newFollow = this.followed;
    }, 100);
  }

  copyUsername() {
    if (this.user) {
      navigator.clipboard.writeText("@" + this.user.username);
    }
  }
}
