import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-confirm-export',
  standalone: true,
  imports: [
    NgClass,
    NgIf
  ],
  templateUrl: './confirm-export.component.html',
  styleUrl: './confirm-export.component.scss'
})
export class ConfirmExportComponent implements AfterViewInit{

  @Input() spotify: boolean | undefined;
  @Input() currentPlaylist: any;
  @Input() id: HTMLDivElement | undefined;
  stage: "confirm" | "running" | "success" | "failed" = "confirm";

  ngAfterViewInit() {

    if (this.id) {
      this.id.addEventListener('hidden.bs.modal', (event) => {
        this.stage = "confirm";
      });
    }
  }

  export() {
    this.stage = "running";
    setTimeout(() => {  //TODO Timeout entfernen und auf Ergebnis warten
      if (this.spotify) {
        this.stage = this.exportToSpotify();
      } else {
        this.stage = this.exportToApplemusic();
      }
    }, 2000);
  }

  exportToSpotify(): "success" | "failed" {
    let success: boolean = false;
    return success ? "success" : "failed";
  }

  exportToApplemusic(): "success" | "failed"  {
    let success: boolean = true;
    return success ? "success" : "failed";
  }
}
