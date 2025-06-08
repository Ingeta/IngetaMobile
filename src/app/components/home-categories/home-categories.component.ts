import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { WordpressService } from './../../services/wordpress.service';
import {SwiperContainer} from 'swiper/element';
import {SwiperOptions} from 'swiper/types';

@Component({
    selector: 'app-home-categories',
    templateUrl: './home-categories.component.html',
    styleUrls: ['./home-categories.component.scss'],
})
export class HomeCategoriesComponent implements OnInit {

    @HostBinding('class.last-slide-active') isLastSlide = false;
    @ViewChild('swiper') swiperElement!: ElementRef<SwiperContainer>;

    categories: any = [];
    page = 1;
    loading = true;

    constructor(
        private wp: WordpressService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getCategories();
    }

    async getCategories() {
        this.wp.getCategories().subscribe(res => {
            this.categories = res;
            this.loading = false;
        });
    }

    loadMore(event) {
        this.page++;

        this.wp.getCategories(this.page).subscribe(res => {
            this.categories = [...this.categories, ...res];

            // Disable infinite loading when maximum reached
            if (this.page === this.wp.pages) {
                event.target.disabled = true;
            }
        });
    }

    goToArticlesPageByCategory(category) {
        this.router.navigate(['/tabs/posts', category]);
    }
}
