import {Component, HostListener, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdown,
    NgbDropdownItem
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent implements OnInit {
  @Input() playlist: any;

  menuIsHovered: boolean  = false;
  isMobile: boolean = false;
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

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;
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
}
