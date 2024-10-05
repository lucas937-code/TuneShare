import { Component } from '@angular/core';
import {BACKEND_URL} from "../../main";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  checkbox: boolean = false;

  saveSettings() {
    //TODO implement
  }

  linkSpotify() {
    window.location.href = `${BACKEND_URL}service/spotify/?action=login`;
  }

}
