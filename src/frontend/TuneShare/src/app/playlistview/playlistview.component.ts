import {Component, HostListener, OnInit} from '@angular/core';
import {PlaylistComponent} from "../playlist/playlist.component";
import {PlaylistService} from "../playlist.service";
import {NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {NgbTooltip, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmExportComponent} from "../confirm-export/confirm-export.component";

@Component({
  selector: 'app-playlistview',
  standalone: true,
  imports: [
    PlaylistComponent,
    NgClass,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    NgbTooltip,
    NgbTooltipModule,
    ConfirmExportComponent
  ],
  templateUrl: './playlistview.component.html',
  styleUrl: './playlistview.component.scss'
})
export class PlaylistviewComponent implements OnInit {

  currentPlaylist: any = this.playlistService.getPlaylists()[1];

  added: boolean = false;
  isMobile: boolean = false;

  tracks: any[] = [
    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaunePaulPosaunePaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },{
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaunePaulPosaunePaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },{
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaunePaulPosaunePaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },{
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaunePaulPosaunePaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },{
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaunePaulPosaunePaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },    {
      id: 1, cover_url: "/assets/papagei-foto.jpg", title: "test1", artist: "LucasListener", duration: "03:03"
    },
    {
      id: 2, cover_url: "/assets/papagei-foto.jpg", title: "test2", artist: "PaulPosaune", duration: "01:01"
    },
  ];

  constructor(private playlistService: PlaylistService) { }

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

  copyLink() {
    navigator.clipboard.writeText(window.location.href); //TODO add link to specific playlist
  }

  exportToSpotify() {
    console.log('exportToSpotify()'); //TODO export Function
  }

  exportToApplemusic() {
    console.log('exportToApplemusic()'); //TODO export Function
  }
}
