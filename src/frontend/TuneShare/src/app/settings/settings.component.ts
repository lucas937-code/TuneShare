import {Component, OnInit} from '@angular/core';
import {BACKEND_URL} from "../../main";
import {FormsModule} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {switchMap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }

  checkbox: boolean = false;
  code: string | null = null;

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.code = params.get('code');
      if (this.code) {
        this.http.get(`${BACKEND_URL}service/spotify/?action=callback&code=${this.code}`)
          .subscribe()
      }
    });
  }

  saveSettings() {
    //TODO implement
  }

  linkSpotify() {
    this.http.get<{ auth_url: string }>(`${BACKEND_URL}service/spotify/?action=login`)
      .subscribe(response => {
        window.location.href = response.auth_url
      })
  }

}
