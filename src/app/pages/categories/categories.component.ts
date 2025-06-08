import { Component, OnInit } from '@angular/core';
import { WordpressService } from './../../services/wordpress.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

    categories: any = [];
    count = null;
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
                this.categories = res;
                this.loading = false;
            },
            error: err => {
                console.log(err);
                this.loading = false;
            }
        });
    }

    gotoPostPageByCategory(id) {
        this.router.navigate(['/tabs/posts', id]);
    }
}
