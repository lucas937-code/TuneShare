import {Component, HostListener, OnInit} from '@angular/core';
import {PlaylistComponent} from "../playlist/playlist.component";
import {PlaylistService} from "../playlist.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-playlistview',
  standalone: true,
  imports: [
    PlaylistComponent,
    NgClass
  ],
  templateUrl: './playlistview.component.html',
  styleUrl: './playlistview.component.scss'
})
export class PlaylistviewComponent implements OnInit {

  currentPlaylist: any = this.playlistService.getPlaylists()[0];

  added: boolean = false;
  newAdded: boolean = false;
  isMobile: boolean = false;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;
  }

  add(){
    this.added = !this.added;
    //Funktion zum Hinzufügen zur Mediathek
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.isMobile = window.innerWidth < 992;
  }
}
