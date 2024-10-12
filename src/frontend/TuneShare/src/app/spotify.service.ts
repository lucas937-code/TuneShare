import { Injectable } from '@angular/core';
import {Playlist, SpotifyUser} from "./types";
import {map, Observable, tap} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BACKEND_URL} from "../main";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }

  authorizeUser(): Observable<any> {
    const params = new HttpParams()
      .set('action', 'login');
    return this.http.get<{ auth_url: string }>(`${BACKEND_URL}service/spotify/`, {params})
      .pipe(tap(response => {
          window.location.href = response.auth_url;
        }
      ))
  }

  getCurrentUser(): Observable<SpotifyUser> {
    const params = new HttpParams()
      .set('action', 'get_current_user');
    return this.http.get<SpotifyUser>(`${BACKEND_URL}service/spotify/`, {params});
  }

  getPlaylists(user_id: string): Observable<Playlist[]> {
    const params = new HttpParams()
      .set('action', 'playlists')
      .set('user_id', user_id);
    return this.http.get<Playlist[]>(`${BACKEND_URL}service/spotify/`, {params});
  }

  getPlaylist(playlist_id: string): Observable<Playlist> {
    const params = new HttpParams()
      .set('action', 'get_playlist')
      .set('playlist_id', playlist_id);
    return this.http.get<Playlist>(`${BACKEND_URL}service/spotify/`, {params});
  }
}
