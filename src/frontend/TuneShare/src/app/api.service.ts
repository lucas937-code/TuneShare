import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Playlist} from "./types";

const BASE_URL: string = "http://localhost:8000/api";

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
