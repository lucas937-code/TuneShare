import { Injectable } from '@angular/core';
import {Playlist, SpotifyUser} from "./types";
import {map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL} from "../main";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  authorizeUser(): Observable<any> {
    return this.http.get<{ auth_url: string }>(`${BACKEND_URL}service/spotify/?action=login`)
      .pipe(tap(response => {
          window.location.href = response.auth_url;
        }
      ))
  }

  getCurrentUser(): Observable<SpotifyUser> {
    return this.http.get<SpotifyUser>(`${BACKEND_URL}service/spotify/?action=get_current_user`);
  }

  getPlaylists(user_id: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${BACKEND_URL}service/spotify/?action=playlists&user_id=${user_id}`);
  }

  getPlaylist(playlist_id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${BACKEND_URL}service/spotify/?action=get_playlist&playlist_id=${playlist_id}`);
  }
}
