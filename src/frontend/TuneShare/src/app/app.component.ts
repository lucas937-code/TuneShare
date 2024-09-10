import {Component, HostListener, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isMobile: boolean = false;
  title = 'TuneShare';

  ngOnInit() {
    this.isMobile = window.innerWidth < 992;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this. isMobile = window.innerWidth < 992;
  }
}
