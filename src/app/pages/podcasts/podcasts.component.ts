import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {PodItem} from '../../../entities/PodItem';
import {PodcastService} from '../../services/podcast.service';
import {Track} from 'plyr';
import { PlaybackService, Track as AudioTrack } from '../../services/playback.service';

@Component({
    selector: 'app-podcasts',
    templateUrl: './podcasts.component.html',
    styleUrls: ['./podcasts.component.scss'],
})
export class PodcastsComponent implements OnInit {

    allEpisodes: PodItem[] = [];
    displayedEpisodes: PodItem[] = [];
    private batchSize = 10;
    private batchIndex = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private podcastService: PodcastService,
        private playbackService: PlaybackService,
    ) { }

    ngOnInit() {
        this.podcastService.getAllEpisodes().subscribe(eps => {
            this.allEpisodes = eps;
            this.loadNextBatch();   // prime first batch
        });
    }

    loadNextBatch(event?: any) {
        const start = this.batchIndex * this.batchSize;
        const next = this.allEpisodes.slice(start, start + this.batchSize);
        this.displayedEpisodes = [...this.displayedEpisodes, ...next];
        this.batchIndex++;

        if (event) {
            event.target.complete();
            // disable infinite scroll if we’ve loaded everything
            if (this.displayedEpisodes.length >= this.allEpisodes.length) {
                event.target.disabled = true;
            }
        }
    }

    loadMore(event: any) {
        this.loadNextBatch(event);
    }

    playEpisode(ep: PodItem) {
        const tracks: AudioTrack[] = this.allEpisodes.map(item => ({
            title: item.title,
            url: item.enclosureUrl,
            imageUrl: item.imageUrl
        }));

        this.playbackService.setPlaylist(tracks);
        const idx = this.allEpisodes.indexOf(ep);
        this.playbackService.playTrack(idx);
    }

    // helper to know if this ep is playing:
    isCurrent(ep: PodItem) {
        return this.playbackService.currentTrack.url === ep.enclosureUrl;
    }

    // pause the global audio element
    pauseEpisode() {
        const audio = document.querySelector('audio');
        if (audio) { (audio as HTMLAudioElement).pause(); }
    }

    gotoPodcastDetailsPage(id) {
        this.router.navigate(['/podcast-details', id]);
    }
}
