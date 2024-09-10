import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  constructor() {}

  getPlaylists() {
    return [
      { id: 1, name: 'Top Hits', description: 'The hottest hits right now.', imageUrl: 'https://via.placeholder.com/150' },
      { id: 2, name: 'Workout Mix', description: 'High-energy tracks to power your workout.', imageUrl: 'https://via.placeholder.com/150' },
      { id: 3, name: 'Chill Vibes', description: 'Relax and unwind with these chill tracks. No one will ever believe how long this description si - oh there is a typo', imageUrl: 'https://via.placeholder.com/150' },
      { id: 4, name: 'Focus', description: 'Stay focused with these instrumental tracks.', imageUrl: 'https://via.placeholder.com/150' },
      { id: 5, name: 'Oldies but Goodies', description: 'Classic hits from the past.', imageUrl: 'https://via.placeholder.com/150' }
    ];
  }
}
