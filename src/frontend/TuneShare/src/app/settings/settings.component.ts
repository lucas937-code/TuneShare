import { Component } from '@angular/core';
import {BACKEND_URL} from "../../main";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

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

  constructor(private http: HttpClient) {
  }

  checkbox: boolean = false;

  saveSettings() {
    //TODO implement
  }

  linkSpotify() {
    this.http.get<{ auth_url: string }>(`${BACKEND_URL}service/spotify/?action=login`)
      .subscribe(response => window.location.href = response.auth_url)
  }

}
