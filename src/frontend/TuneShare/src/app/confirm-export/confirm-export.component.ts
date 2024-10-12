import {Component, Input, OnInit} from '@angular/core';
import {User} from "../types";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-confirm-export',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './confirm-export.component.html',
  styleUrl: './confirm-export.component.scss'
})
export class ConfirmExportComponent {

  @Input() spotify: boolean | undefined;
  @Input() currentPlaylist: any;

  export() {
    if (this.spotify) {
      this.exportToSpotify();
    } else {
      this.exportToApplemusic();
    }
  }

  exportToSpotify() {

  }

  exportToApplemusic() {

  }
}
