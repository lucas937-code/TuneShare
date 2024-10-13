import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmExportComponent} from "../confirm-export/confirm-export.component";
import {Playlist, playlistType, Track, User} from "../types";
import {TuneShareService} from "../tune-share.service";

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
export class PlaylistComponent implements OnInit, OnChanges {
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
  };

  menuIsHovered: boolean  = false;
  isMobile: boolean = false;
  added: boolean = false;
  url: string = "/playlist?playlist="
  id_type: string | number = "";
  type: playlistType = "ts"
  user: User | undefined;

  constructor(private tuneshareService : TuneShareService) {}

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
    this.added = !this.added;
    //Funktion zum Hinzufügen zur Mediathek
  }

  ngOnChanges() {
    if (this.type == "ts") {
      this.tuneshareService.getUser(this.playlist.owner_id).subscribe({
        next: user => {
          this.user = user;
        }
      });
    }
  }

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;

    if(this.playlist.id != undefined){
      this.type = "ts";
      this.id_type = this.playlist.id;
    }else if(this.playlist.spotify_id != undefined){
      this.type = "sp";
      this.id_type = this.playlist.spotify_id;
    }else if(this.playlist.apple_music_id != undefined){
      this.type = "am";
      this.id_type = this.playlist.apple_music_id;
    }
    this.url="/playlist?playlist="+this.id_type+"&type="+this.type;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
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
}
