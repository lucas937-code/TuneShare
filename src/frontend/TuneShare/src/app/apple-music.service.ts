import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(`${BACKEND_URL}service/apple_music/?action=login`);
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
      return this.http.get<any>(`${BACKEND_URL}service/apple_music/?action=callback`, {
        headers : {
          'music-user-token': musicUserToken
        }
      });
    }))
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${BACKEND_URL}service/apple_music/?action=playlists`);
  }

  getPlaylist(playlist_id: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${BACKEND_URL}service/apple_music/?action=get_playlist&id=${playlist_id}`);
  }
}
