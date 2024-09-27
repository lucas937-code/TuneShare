import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  linkSpotify() {
    window.location.href = 'http://localhost:8000/service/spotify/?action=login';
  }
}
