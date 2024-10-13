import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BACKEND_URL } from "../main";
import {Playlist, User} from "./types";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TuneShareService {

  constructor(private http: HttpClient) { }

  // get a user by id
  getUser(user_id: number): Observable<User> {
    return this.http.get<User>(`${BACKEND_URL}api/user/${user_id}/`);
  }

  // TODO
  // getCurrentUser(): Observable<User> {
  //
  // }

  // get a list of users the currently logged in user is following
  getFollowedUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${BACKEND_URL}api/user/follows/`);
  }

  getPlaylistsOfUser(user_id: number): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${BACKEND_URL}api/user/${user_id}/playlists/`);
  }
}
