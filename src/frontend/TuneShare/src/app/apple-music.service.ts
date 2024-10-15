import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {concatMap, from, Observable, switchMap, throwError} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Playlist } from "./types";
import { BACKEND_URL } from "../main";

@Injectable({
  providedIn: 'root'
})
export class AppleMusicService {
  private developerToken: string | null = null;
  private musicUserToken: string | null = null;
  private musicInstance: any = null;

  constructor(private http: HttpClient) {}

  initialize(): Observable<any> {
    return this.getDeveloperToken().pipe(
      tap((data: { developer_token: string }) => {
        this.developerToken = data.developer_token;
      }),
      concatMap(data => {
        return from(this.setupMusicKit()).pipe(
          catchError(error => {
            return throwError(error);
          })
        );
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  private getDeveloperToken(): Observable<any> {
    const params = new HttpParams()
      .set('action', 'login');
    return this.http.get(`${BACKEND_URL}service/apple_music/`, {params});
  }

  private setupMusicKit(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!window.MusicKit) {
        console.error('MusicKit is not defined.');
        reject('MusicKit is not defined.');
        return;
      }

      if (this.developerToken) {
        window.MusicKit.configure({
          developerToken: this.developerToken,
          app: {
            name: 'TuneShare',
            build: '1.0.0',
          },
        });

        const interval = setInterval(() => {
          this.musicInstance = window.MusicKit.getInstance();
          if (this.musicInstance) {
            clearInterval(interval);
            resolve();
          }
        });

      } else {
        console.error('Developer token is missing.');
        reject('Developer token is missing.');
      }
    });
  }


  authorizeUser(): Observable<any> {
    return new Observable<string>(observer => {
      this.musicInstance.authorize().then((musicUserToken: string) => {
        this.musicUserToken = musicUserToken;
        observer.next(musicUserToken);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    }).pipe(switchMap(musicUserToken => {
      const params = new HttpParams()
        .set('action', 'callback')
        .set('music_user_token', musicUserToken);
      return this.http.get<any>(`${BACKEND_URL}service/apple_music/`, {params});
    }));
  }

  getPlaylists(): Observable<Playlist[]> {
    const params = new HttpParams().set('action', 'playlists');
    return this.http.get<Playlist[]>(`${BACKEND_URL}service/apple_music/`, {params});
  }

  getPlaylist(playlist_id: string): Observable<Playlist> {
    const params = new HttpParams()
      .set('action', 'get_playlist')
      .set('id', playlist_id);
    return this.http.get<Playlist>(`${BACKEND_URL}service/apple_music/`, {params});
  }

  importFromAppleMusic(playlist_id: string): Observable<any> {
    const params = new HttpParams()
      .set('action', 'import_to_tuneshare')
      .set('id', playlist_id);
    return this.http.get<any>(`${BACKEND_URL}service/apple_music/`, {params});
  }

  exportToAppleMusic(playlist_id: number): Observable<any> {
    const params = new HttpParams()
      .set('action', 'export_to_apple_music')
      .set('playlist_id', playlist_id);
    return this.http.get<any>(`${BACKEND_URL}service/apple_music/`, {params});
  }

  removeAppleMusicLink(): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set('action', 'remove_link');
    return this.http.get(`${BACKEND_URL}service/apple_music/`, {params});
  }
}
