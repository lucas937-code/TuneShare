import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmExportComponent} from "../confirm-export/confirm-export.component";
import {Playlist, playlistType, Track, User} from "../types";
import {TuneShareService} from "../tune-share.service";
import {AppleMusicService} from "../apple-music.service";
import {SpotifyService} from "../spotify.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdown,
    NgbDropdownItem,
    NgbTooltip,
    ConfirmExportComponent
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})

// displays the playlist as card view with quick actions
export class PlaylistComponent implements OnInit {
  @Input() playlist: Playlist = {
    id: undefined,
    owner_id: -1,
    spotify_id: undefined,
    apple_music_id: undefined,

    date_created: undefined,
    date_modified: undefined,

    title: "undefined",
    description: undefined,

    track_list: undefined,
    cover_url: "/assets/papagei-foto.jpg",
    origin_id: ""
  };
  @Output() is_deleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  menuIsHovered: boolean  = false;
  isMobile: boolean = false;
  added: boolean = false;
  url: string = "/playlist?playlist="
  id_type: string | number = "";
  type: playlistType | undefined;
  user: User | undefined;
  disable : boolean = false;
  show: boolean = false;

  constructor(private tuneshareService : TuneShareService, private appleMusicService: AppleMusicService, private spotifyService: SpotifyService) {}

  tilt(event: MouseEvent): void {
    const img = event.currentTarget as HTMLElement;
    const imgRect = img.getBoundingClientRect();
    const imgCenterX = imgRect.left + imgRect.width / 2;
    const imgCenterY = imgRect.top + imgRect.height / 2;

    const mouseX = event.clientX - imgCenterX;
    const mouseY = event.clientY - imgCenterY;

    const rotateX = (mouseY / imgRect.height) * 15;
    const rotateY = (mouseX / imgRect.width) * 15 * (mouseY <= 0 ? 1 : -1);


    img.style.setProperty('--rotateX', `${rotateX}deg`);
    img.style.setProperty('--rotateY', `${rotateY}deg`);
    img.classList.add('tilted');
  }

  resetTilt(event: MouseEvent): void {
    const img = event.currentTarget as HTMLElement;
    img.classList.remove('tilted');
    img.style.setProperty('--rotateX', `0deg`);
    img.style.setProperty('--rotateY', `0deg`);
  }

  add(){
    if (!this.disable){
      if (this.playlist.apple_music_id) {
        this.appleMusicService.importFromAppleMusic(this.playlist.apple_music_id).subscribe();
        this.added = this.disable = true;
      }
      if (this.playlist.spotify_id) {
        this.spotifyService.importFromSpotify(this.playlist.spotify_id).subscribe();
        this.added = this.disable = true;
      }
    }
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;
    this.show = false;
    this.checkAdded();

    if(this.playlist.id){
      this.type = "ts";
      this.id_type = this.playlist.id;
    }else if(this.playlist.spotify_id){
      this.type = "sp";
      this.id_type = this.playlist.spotify_id;
    }else if(this.playlist.apple_music_id){
      this.type = "am";
      this.id_type = this.playlist.apple_music_id;
    }
    this.url="/playlist?playlist="+this.id_type+"&type="+this.type;

    if (this.type == "ts") {
      this.tuneshareService.getUser(this.playlist.owner_id).subscribe({
        next: user => {
          this.user = user;
        }
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
  }

  checkAdded(){
    this.tuneshareService.getCurrentUser().pipe(switchMap(user => {
      if (this.type == 'ts'){
        this.added = this.playlist.owner_id == user.id;
        this.disable = this.added;
        this.show = true;
      }
      return this.tuneshareService.getPlaylistsOfUser(user.id);
    })).subscribe(playlists => {
      if (this.type == "sp") {
        this.added = playlists.find(playlist => playlist.origin_id == this.playlist.spotify_id) != undefined;
        this.disable = this.added;
        this.show = true;
      } else if (this.type == "am"){
        this.added = playlists.find(playlist => playlist.origin_id == this.playlist.apple_music_id) != undefined;
        this.disable = this.added;
        this.show = true;
      }
    });
  }

  hoveredTrue(){
    this.menuIsHovered = true;
  }
  hoveredFalse(){
    this.menuIsHovered = false;
  }

  copyLink() {
    navigator.clipboard.writeText("localhost:4200"+this.url);
  }

  removePlaylist() {
    if (this.playlist.id)
      this.tuneshareService.deletePlaylist(this.playlist.id).subscribe()

    this.is_deleted.next(true);
  }
}
