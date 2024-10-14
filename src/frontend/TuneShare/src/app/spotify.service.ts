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

  importFromSpotify(playlist_id: string): Observable<any> {
    const params = new HttpParams()
      .set('action', 'add_to_tuneshare')
      .set('playlist_id', playlist_id);
    return this.http.get<any>(`${BACKEND_URL}service/spotify/`, {params});
  }

  exportToSpotify(playlist_id: number): Observable<{ snapshot_id: string }> {
    const params: HttpParams = new HttpParams()
      .set('playlist_id', playlist_id)
      .set('action', 'export_to_spotify');
    return this.http.get<any>(`${BACKEND_URL}service/spotify/`, {params});
  }
}
