// src/app/services/podcast.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {PodItem} from '../../entities/PodItem';
import * as Parser from 'rss-parser';

@Injectable({ providedIn: 'root' })
export class PodcastService {
    private parser = new Parser();

    constructor(private http: HttpClient) {}

    private parseFeed(url: string): Observable<PodItem[]> {
        return this.http
            .get(url, { responseType: 'text' })
            .pipe(
                // 1) turn the XML text string into a Promise<Feed>
                switchMap(xml => from(this.parser.parseString(xml))),
                // 2) now feed is the actual object with .items and .image
                map((feed: any) => feed.items.map((item: any) =>
                    new PodItem(
                        item.title       || '',
                        item.link        || '',
                        new Date(item.pubDate || ''),
                        (item.enclosure  || {}).url || '',
                        (item.itunes     || {}).image || feed.image?.url,
                        item.content     || item['itunes:summary'] || '',
                    )
                ))
            );
    }

    getAllEpisodes(): Observable<PodItem[]> {
        const urls = [
            'https://anchor.fm/s/1005e5f00/podcast/rss',
            'https://anchor.fm/s/1007aa7a0/podcast/rss'
        ];
        return from(
            Promise.all(urls.map(u => this.parseFeed(u).toPromise()))
        ).pipe(
            map(lists => ([] as PodItem[]).concat(...lists)),
            map(all   => all.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()))
        );
    }
}
