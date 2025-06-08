import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import { WordpressService } from './../../services/wordpress.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import {SwiperContainer} from 'swiper/element';
import {SwiperOptions} from 'swiper/types';


@Component({
    selector: 'app-home-recent-news',
    templateUrl: './home-recent-news.component.html',
    styleUrls: ['./home-recent-news.component.scss'],
})
export class HomeRecentNewsComponent implements OnInit {
    // Slider Options
    @HostBinding('class.last-slide-active') isLastSlide = false;
    @ViewChild('swiper') swiperElement!: ElementRef<SwiperContainer>;

    posts = [];
    page = 1;
    count = null;
    loading = true;

    constructor(
        private router: Router,
        private wp: WordpressService,
        private loadingCtrl: LoadingController
    ) { }

    ngOnInit() {
        this.loadPosts();
    }

    async loadPosts() {
        this.wp.getLatestPost().subscribe({
            next: res => {
                this.count = this.wp.totalPosts;
                this.posts = res;
                this.loading = false;
            },
            error: err => {
                console.log(err);
                this.loading = false;
            }
        });
    }

    loadMore(event) {
        this.page++;

        this.wp.getPosts(this.page).subscribe(res => {
            this.posts = [...this.posts, ...res];

            // Disable infinite loading when maximum reached
            if (this.page === this.wp.pages) {
                event.target.disabled = true;
            }
        });
    }

    async gotoPostDetailsPage(id) {
        this.router.navigate(['/post-details', id]);
    }
}
