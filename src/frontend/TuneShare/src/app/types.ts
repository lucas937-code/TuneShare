export interface Playlist {
    id: number;
    owner_user_id: number;
    spotify_id: string | undefined;
    apple_music_id: string | undefined;

    date_created: Date;
    date_modified: Date;

    title: string;
    description: string | undefined;

    track_list: number[];
    cover_url: string;
}


export interface Track {
    id: number;
    spotify_id: string | undefined;
    apple_music_id: string | undefined;

    date_created: Date;

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
