import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Track {
    title: string;
    url: string;
    imageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class PlaybackService {
    // private subject holding the array
    private playlistSub = new BehaviorSubject<Track[]>([]);
    readonly playlist$ = this.playlistSub.asObservable();

    private indexSub = new BehaviorSubject<number>(0);
    readonly index$ = this.indexSub.asObservable();

    get playlist(): Track[] { return this.playlistSub.value; }
    get index(): number  { return this.indexSub.value; }

    setPlaylist(tracks: Track[]) {
        this.playlistSub.next(tracks);
        this.indexSub.next(0);
    }

    playTrack(idx: number) { this.indexSub.next(idx); }
    next()  { this.indexSub.next(Math.min(this.playlist.length - 1, this.index + 1)); }
    prev()  { this.indexSub.next(Math.max(0, this.index - 1)); }

    get currentTrack(): Track { return this.playlist[this.index] || {title: '', url: '', imageUrl: ''}; }
}
