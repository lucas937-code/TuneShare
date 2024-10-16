import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { BACKEND_URL } from "../main";
import {Playlist, Track, User} from "./types";
import {map, Observable, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TuneShareService {

  constructor(private http: HttpClient) { }

  // get a user by id
  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(`${BACKEND_URL}api/user/${user_id}/`);
  }

  // get the current user
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${BACKEND_URL}api/user/current/`);
  }

  // get a list of users the currently logged in user is following
  getFollowedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BACKEND_URL}api/user/follows/`);
  }

  // Adds the user with the given id to the current user's following list
  followUser(user_id: number): Observable<User> {
    return this.http.post<User>(`${BACKEND_URL}api/user/follow_user/?id=${user_id}`, {});
  }

  // Adds the user with the given id to the current user's following list
  unfollowUser(user_id: number): Observable<User> {
    return this.http.delete<User>(`${BACKEND_URL}api/user/unfollow_user/?id=${user_id}`, {});
  }

  // get all TuneShare playlists of a given user
  getPlaylistsOfUser(user_id: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${BACKEND_URL}api/user/${user_id}/playlists/`);
  }

  // get all TuneShare playlists of a given user
  getFollowedPlaylistsOfUser(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${BACKEND_URL}api/user/followed_playlists/`);
  }

  // get a specific TuneShare Playlist by id
  getPlaylist(playlist_id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${BACKEND_URL}api/playlist/${playlist_id}/`).pipe(
      switchMap(playlist =>
        this.http.get<Track[]>(`${BACKEND_URL}api/playlist/${playlist_id}/tracks/`).pipe(
          map(track_list => {
            playlist.track_list = track_list;
            return playlist;
          })
        )
      )
    );
  }

  // get a specific Track by id
  getTrack(track_id: number): Observable<Track> {
    return this.http.get<Track>(`${BACKEND_URL}api/track/${track_id}/`);
  }

  // searches for Users matching the given query„
  searchUser(query: string): Observable<User[]> {
    const params: HttpParams = new HttpParams()
      .set('search', query);
    return this.http.get<User[]>(`${BACKEND_URL}api/user/`, {params});
  }

  // searches for Playlists matching the given query
  searchPlaylist(query: string): Observable<Playlist[]> {
    const params: HttpParams = new HttpParams()
      .set('search', query);
    return this.http.get<Playlist[]>(`${BACKEND_URL}api/playlist/`, {params});
  }

  // searches for Tracks matching the given query
  searchTrack(query: string): Observable<Track[]> {
    const params: HttpParams = new HttpParams()
      .set('search', query);
    return this.http.get<Track[]>(`${BACKEND_URL}api/track/`, {params});
  }

  // checks if a user has linked spotify or AppleMusic
  linkedServices(): Observable<{spotify: boolean, apple_music: boolean}> {
    return this.http.get<{spotify: boolean, apple_music: boolean}>(`${BACKEND_URL}api/user/linked_services/`);
  }

  //follows a playlist by another user
  followPlaylist(playlist_id:number): Observable<Playlist> {
    return this.http.post<Playlist>(`${BACKEND_URL}api/user/follow_playlist/?id=${playlist_id}`, {});
  }

  //unfollows a playlist by another user
  unfollowPlaylist(playlist_id:number): Observable<void> {
    return this.http.delete<void>(`${BACKEND_URL}api/user/unfollow_playlist/?id=${playlist_id}`, {});
  }

  // deletes a playlist from TuneShare
  deletePlaylist(playlist_id: number): Observable<any> {
    return this.http.delete(`${BACKEND_URL}api/playlist/${playlist_id}/`);
  }
}
