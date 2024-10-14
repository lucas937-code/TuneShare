import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {PlaylistComponent} from "../playlist/playlist.component";
import {PlaylistRotateComponent} from "../playlist-rotate/playlist-rotate.component";
import {TuneShareService} from "../tune-share.service";
import {switchMap} from "rxjs";
import {Playlist, User} from "../types";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    PlaylistComponent,
    PlaylistRotateComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  ownPlaylists: Playlist[] = [];
  done:boolean = false;
  followerWithPlaylists: {user: User, playlists: Playlist[]}[] = [];

  constructor(private tuneshareService: TuneShareService) {
  }

  ngOnInit(): void {
    this.tuneshareService.getCurrentUser().pipe(switchMap(user => {
      return this.tuneshareService.getPlaylistsOfUser(user.id);
    })).subscribe({
      next: playlists => {
        this.ownPlaylists = playlists;
        this.done = true;
        console.log(this.ownPlaylists);
      }
    });

    this.tuneshareService.getFollowedUsers().subscribe({
      next: users => {
        for (let user of users) {
          this.tuneshareService.getPlaylistsOfUser(user.id).subscribe({
            next: playlists => {
              if (playlists.length > 0) {
                this.followerWithPlaylists.push({ user, playlists });
              }
            }
          })
        }
      }
    });
  }
}
