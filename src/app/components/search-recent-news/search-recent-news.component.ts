import { Component, OnInit } from '@angular/core';
import { WordpressService } from './../../services/wordpress.service';
import { Router } from '@angular/router';
import {SwiperContainer} from 'swiper/element';
import {SwiperOptions} from 'swiper/types';


@Component({
    selector: 'app-search-recent-news',
    templateUrl: './search-recent-news.component.html',
    styleUrls: ['./search-recent-news.component.scss'],
})
export class SearchRecentNewsComponent implements OnInit {

    posts: any = [];
    loading = true;
    constructor(
        private wp: WordpressService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadPosts();
    }

    async loadPosts() {
        this.loading = true;
        this.wp.getPosts().subscribe({
            next: (res: any[]) => {
                this.posts = res;
                this.loading = false;
            },
            error: err => {
                console.log(err);
                this.loading = false;
            }
        });
    }

    async gotoPostDetailsPage(id) {
        this.router.navigate(['/post-details', id]);
    }
}
