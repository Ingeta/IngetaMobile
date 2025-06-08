import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import { WordpressService } from './../../services/wordpress.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-related-posts',
    templateUrl: './related-posts.component.html',
    styleUrls: ['./related-posts.component.scss'],
})
export class RelatedPostsComponent implements OnInit {

    @Input() categories: number[] | undefined;

    page: any = 1;
    posts: any[] = [];

    constructor(
        private wp: WordpressService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (
            'categories' in changes &&
            Array.isArray(this.categories) &&
            this.categories.length > 0
        ) {
            // categories just became a nonempty array
            this.getRelatedPosts();
        }
    }

    async getRelatedPosts() {
        this.wp.getPostByCategory(this.categories.join(), this.page).subscribe(res => {
            this.posts = res;
        });
    }

    async gotoPostDetailsPage(id) {
        this.router.navigate(['/post-details', id]);
    }

}
