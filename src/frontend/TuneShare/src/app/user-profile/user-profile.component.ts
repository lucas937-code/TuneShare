import {Component, HostListener, Input} from '@angular/core';
import {PlaylistListComponent} from "../playlistList/playlist-list.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {PlaylistComponent} from "../playlist/playlist.component";
import {PlaylistService} from "../playlist.service";
import {User} from "../types";

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [
        PlaylistListComponent,
        NgForOf,
        PlaylistComponent,
        NgIf,
        NgClass,
    ],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
    @Input() user: User = {
        id: 0,
        spotify_id: undefined,
        apple_music_id: "test",
        date_created: new Date("2000-02-02"),
        username: "Max_2000",
        display_name: "Max Mustermannn",
    }

    playlists: any[] = [];
    isPlaylistsTransformed: boolean = false;
    isFriendsTransformed: boolean = false;
    isShrunk: boolean = false;
    isHidden: boolean = false;
    showCopied: boolean = false;
    followed: boolean = false; //True = Nutzer wird bereits gefolgt
    newFollow: boolean = this.followed;

    constructor(private playlistService: PlaylistService) {
    }

    ngOnInit() {
        this.playlists = this.playlistService.getPlaylists();
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
            this.isShrunk = true;
            setTimeout(() => {
                this.isHidden = this.isShrunk
            }, 200);
        } else {
            this.isHidden = false;
            setTimeout(() => {
                this.isShrunk = this.isHidden = window.scrollY > 0
            }, 1);
        }
    }

    copyUsername() {
        navigator.clipboard.writeText("@" + this.user.username).then(() => {
            setTimeout(() => {
                this.showCopied = false;
            }, 800);
            this.showCopied = true;
        });
    }

    follow(){
        this.followed = !this.followed;
        setTimeout(() => {
          this.newFollow = this.followed;
        }, 100);
    }
}
