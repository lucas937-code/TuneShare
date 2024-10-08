import { Injectable } from '@angular/core';
import {Playlist} from "./types";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor() {}

  getPlaylists(): Playlist[] {
     return [
      {
        id: 1,
        owner_id: 101010101001010101,
        spotify_id: "37i9dQZF1DXcBWIGoYBM5M",
        apple_music_id: undefined,
        date_created: new Date("2023-09-01"),
        date_modified: new Date("2023-09-02"),
        title: "Top Hits 2023 Das war ein sehr langes Jahr und hat damit auch einen sehr langen Titel verdient",
        description: "The biggest hits of the year.",
        track_list: [1, 2, 3, 4, 5],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 2,
        owner_id: 102,
        spotify_id: undefined,
        apple_music_id: "pl.u-XkD0mN0F6ER",
        date_created: new Date("2023-07-15"),
        date_modified: new Date("2023-07-16"),
        title: "Chill Vibes",
        description: "Relax and unwind with these chill tracks.",
        track_list: [6, 7, 8, 9, 10],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 3,
        owner_id: 103,
        spotify_id: "37i9dQZF1DXaKIA8E7WcJj",
        apple_music_id: undefined,
        date_created: new Date("2023-08-01"),
        date_modified: new Date("2023-08-05"),
        title: "Rock Classics",
        description: "The best classic rock songs.",
        track_list: [11, 12, 13, 14, 15],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 4,
        owner_id: 104,
        spotify_id: "37i9dQZF1DWYmmr74INQlb",
        apple_music_id: "pl.u-kv9o2JBk0",
        date_created: new Date("2023-05-10"),
        date_modified: new Date("2023-05-12"),
        title: "Party Playlist",
        description: "Get the party started with these bangers. Lets get it started -aha - lets get it started in here! Black Eyed Peas sind Beste und der Text hier wird immer länger mit jedem neuen Wort so wie...",
        track_list: [16, 17, 18, 19, 20],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 5,
        owner_id: 105,
        spotify_id: undefined,
        apple_music_id: undefined,
        date_created: new Date("2023-04-20"),
        date_modified: new Date("2023-04-21"),
        title: "Workout Motivation",
        description: "Keep the energy up with these high-intensity tracks.",
        track_list: [21, 22, 23, 24, 25],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 6,
        owner_id: 106,
        spotify_id: "37i9dQZF1DX4WYpdgoIcn6",
        apple_music_id: undefined,
        date_created: new Date("2023-02-18"),
        date_modified: new Date("2023-02-20"),
        title: "Indie Discoveries",
        description: "Discover the best new indie tracks.",
        track_list: [26, 27, 28, 29, 30],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 7,
        owner_id: 107,
        spotify_id: undefined,
        apple_music_id: "pl.u-XXXXX4lXaY",
        date_created: new Date("2023-06-25"),
        date_modified: new Date("2023-06-27"),
        title: "Summer Vibes",
        description: "Feel the summer heat with these tropical tracks.",
        track_list: [31, 32, 33, 34, 35],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 8,
        owner_id: 108,
        spotify_id: "37i9dQZF1DX5Ejj0EkURtP",
        apple_music_id: undefined,
        date_created: new Date("2023-01-01"),
        date_modified: new Date("2023-01-03"),
        title: "Focus Music",
        description: "Stay focused with these calming instrumental tracks.",
        track_list: [36, 37, 38, 39, 40],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 9,
        owner_id: 109,
        spotify_id: undefined,
        apple_music_id: "pl.u-Vop9PVzl45",
        date_created: new Date("2023-03-14"),
        date_modified: new Date("2023-03-15"),
        title: "Road Trip",
        description: "The perfect playlist for your next adventure.",
        track_list: [41, 42, 43, 44, 45],
        cover_url: "/assets/papagei-foto.jpg"
      },
      {
        id: 10,
        owner_id: 110,
        spotify_id: "37i9dQZF1DXdPec7aLTmlC",
        apple_music_id: undefined,
        date_created: new Date("2023-10-02"),
        date_modified: new Date("2023-10-05"),
        title: "Throwback 90s",
        description: "Relive the 90s with these nostalgic hits.",
        track_list: [46, 47, 48, 49, 50],
        cover_url: "/assets/papagei-foto.jpg"
      },
       {
        id: 11,
        owner_id: 110,
        spotify_id: "37i9dQZF1DXdPec7aLTmlC",
        apple_music_id: undefined,
        date_created: new Date("2023-10-02"),
        date_modified: new Date("2023-10-05"),
        title: "Throwback 90s",
        description: "Relive the 90s with these nostalgic hits.",
        track_list: [46, 47, 48, 49, 50],
        cover_url: "/assets/papagei-foto.jpg"
      }
    ];
  }
}
