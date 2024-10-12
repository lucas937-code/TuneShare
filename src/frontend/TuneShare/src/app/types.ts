export interface Playlist {
    id: number | undefined;
    owner_id: number;
    spotify_id: string | undefined;
    apple_music_id: string | undefined;

    date_created: Date | undefined;
    date_modified: Date | undefined;

    title: string;
    description: string | undefined;

    track_list: Track[] | number[] | undefined;
    cover_url: string;
}


export interface Track {
    id: number | undefined;
    spotify_id: string | undefined;
    apple_music_id: string | undefined;

    date_created: Date | undefined;

    title: string;
    artist: string;
    cover_url: string;
}


export interface User {
    id: number;
    spotify_id: string | undefined;
    apple_music_id: string | undefined;

    date_created: Date;

    username: string;
    display_name: string;
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  uri: string;
}

export type playlistType =  "sp" | "am" | "ts";
