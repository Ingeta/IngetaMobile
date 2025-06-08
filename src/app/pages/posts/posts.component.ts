import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { WordpressService } from './../../services/wordpress.service';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {

    category: any;
    articles: any;
    grid = false;
    oneColumn = false;
    list = true;

    posts = [];
    page = 1;
    count = null;
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private wp: WordpressService,
    ) { }

    ngOnInit() {
        // Get Slug URL
        this.route.params.subscribe(params => {
            this.category = params.category;
        });

        this.loadPosts();
    }

    async loadPosts() {
        this.wp.getPosts().subscribe({
            next: (res: any[]) => {
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

    gotoPostDetailsPage(id) {
        this.router.navigate(['/post-details', id]);
    }

    // One column view function
    showOneColumn() {
        this.oneColumn = true;
        this.grid = false;
        this.list = false;
    }

    // Grid view function
    showGrid() {
        this.grid = true;
        this.oneColumn = false;
        this.list = false;
    }

    // List view function
    showList() {
        this.list = true;
        this.grid = false;
        this.oneColumn = false;
    }
}
