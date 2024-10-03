import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Playlist} from "./types";
import {BACKEND_URL} from "../main";

const BASE_URL: string = `${BACKEND_URL}api`;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  getPlaylist(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${BASE_URL}/playlist/${id}/?format=json`);
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${BASE_URL}/playlist/?format=json`);
  }
}
