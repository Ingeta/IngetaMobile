import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordpressService } from './../../services/wordpress.service';
import {LoadingController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-post-by-category',
    templateUrl: './post-by-category.component.html',
    styleUrls: ['./post-by-category.component.scss'],
})
export class PostByCategoryComponent implements OnInit {

    category: any;
    articles: any;
    grid = false;
    oneColumn = false;
    list = true;
    categoryName: any;
    posts = [];
    page = 1;
    count = null;
    totalPages: number = null;
    loading = true;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private wp: WordpressService,
        private loadingCtrl: LoadingController,
        public navCtrl: NavController
    ) { }


    ngOnInit() {
        // Get Slug URL
        this.route.params.subscribe(params => {
            this.category = params.category;
            this.page = 1;
            this.posts = [];
            this.totalPages = null;

            this.loadPosts();
            this.getCategoryDetailsById();
        });
    }

    async loadPosts() {
        this.wp.getPostByCategory(this.category, this.page).subscribe({
            next: res => {
                if (this.totalPages === null) {
                    this.totalPages = this.wp.pages;
                }
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
        // If we already know totalPages and page is at or beyond it, disable
        if (this.totalPages && this.page >= this.totalPages) {
            event.target.complete();
            event.target.disabled = true;
            return;
        }
        this.page++;

        this.wp.getPostByCategory(this.category, this.page).subscribe({
            next: res => {
                this.posts = [...this.posts, ...res];
                event.target.complete();

                // If we just loaded the last page, disable infinite scroll:
                if (this.page >= this.totalPages) {
                    event.target.disabled = true;
                }
            },
            error: err => {
                // If WP returns “invalid_page_number”, disable infinite scroll
                event.target.complete();
                event.target.disabled = true;
            }
        });
    }

    // Get category details by category Id
    getCategoryDetailsById() {
        this.wp.getCategoryByCategoryId(this.category).subscribe(res => {
            this.categoryName = res.name;
        });
    }

    gotoArticleDetailsPage(id) {
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
