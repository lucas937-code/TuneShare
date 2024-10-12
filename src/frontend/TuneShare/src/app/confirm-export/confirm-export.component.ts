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
  stage:number = 1; // 1=confirm; 2=running;3=success;4=failed

  ngAfterViewInit() {

    if (this.id) {
      this.id.addEventListener('hidden.bs.modal', (event) => {
        this.stage=1;
      });
    }
  }

  export() {
    this.stage = 2
    setTimeout(() => {  //TODO Timeout entfernen und auf Ergebnis warten
      if (this.spotify) {
        this.stage = this.exportToSpotify();
      } else {
        this.stage = this.exportToApplemusic();
      }
    }, 2000);
  }

  exportToSpotify(): number {
    let success: boolean = false; //Ergebnis des Exports
    return success ? 3 : 4;
  }

  exportToApplemusic():number {
    let success: boolean = true;  //Ergebnis des Exports
    return success ? 3 : 4;
  }
}
