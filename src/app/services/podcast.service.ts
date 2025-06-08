// src/app/services/podcast.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PodItem } from '../../entities/PodItem';

@Injectable({ providedIn: 'root' })
export class PodcastService {
    private feedUrls = [
        'https://anchor.fm/s/1005e5f00/podcast/rss',
        'https://anchor.fm/s/1007aa7a0/podcast/rss'
    ];

    constructor(private http: HttpClient) {}

    private parseFeed(url: string): Observable<PodItem[]> {
        return this.http.get(url, { responseType: 'text' }).pipe(
            map(xmlString => {
                const doc = new DOMParser().parseFromString(xmlString, 'application/xml');
                const items = Array.from(doc.querySelectorAll('item'));
                return items.map(itemEl => {
                    const text = (sel: string) => itemEl.querySelector(sel)?.textContent?.trim() || '';
                    const enclosureUrl = itemEl.querySelector('enclosure')?.getAttribute('url') || '';
                    // itunes:image is in the iTunes namespace
                    const itunesImage = itemEl.getElementsByTagNameNS(
                        'http://www.itunes.com/dtds/podcast-1.0.dtd',
                        'image'
                    )[0]?.getAttribute('href') || '';

                    return new PodItem(
                        text('guid'),
                        text('title'),
                        text('link'),
                        new Date(text('pubDate')),
                        enclosureUrl,
                        itunesImage,
                        text('description')
                    );

                });
            })
        );
    }

    /** Fetch both feeds in parallel, merge & sort by date desc */
    getAllEpisodes(): Observable<PodItem[]> {
        const calls = this.feedUrls.map(u => this.parseFeed(u));
        return forkJoin(calls).pipe(
            map(lists => ([] as PodItem[]).concat(...lists)),
            map(all => all.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()))
        );
    }
}
