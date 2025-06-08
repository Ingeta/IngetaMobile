import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordpressService } from './../../services/wordpress.service';

@Component({
    selector: 'app-search-categories',
    templateUrl: './search-categories.component.html',
    styleUrls: ['./search-categories.component.scss'],
})
export class SearchCategoriesComponent implements OnInit {

    categories: any = [];
    loading = true;

    constructor(
        private wp: WordpressService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getCategories();
    }

    async getCategories() {
        this.wp.getCategories().subscribe({
            next: res => {
                setTimeout(() => { // Introduce a 2-second delay
                    this.categories = res;
                    this.loading = false;
                }, 1000);

            },
            error: err => {
                this.loading = false;
            }
        });
    }

    gotoPostPageByCategory(id) {
        this.router.navigate(['/tabs/posts', id]);
    }
}
