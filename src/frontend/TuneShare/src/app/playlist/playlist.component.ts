import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {
  @Input() playlist: any;

  added: boolean = false;

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
}
