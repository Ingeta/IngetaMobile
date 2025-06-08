import { Component, OnInit } from '@angular/core';
import { WordpressService } from './../../services/wordpress.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-hot-news',
    templateUrl: './home-hot-news.component.html',
    styleUrls: ['./home-hot-news.component.scss'],
})
export class HomeHotNewsComponent implements OnInit {

    posts = [];
    page = 1;
    count = null;
    loading = true;

    constructor(
        private wp: WordpressService,
        private router: Router
    ) { }

    ngOnInit() {
        this.loadPosts();
    }

    async loadPosts() {
        this.wp.getPosts().subscribe({
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
            event.target.complete();

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
