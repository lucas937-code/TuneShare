import { Component } from '@angular/core';
import {BACKEND_URL} from "../../main";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  linkSpotify() {
    window.location.href = `${BACKEND_URL}service/spotify/?action=login`;
  }
}
