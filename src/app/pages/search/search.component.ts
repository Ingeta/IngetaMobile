import { Component, OnInit } from '@angular/core';
import { WordpressService } from './../../services/wordpress.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

    results: any[] = [];
    page = 1;
    loading = true;
    lastTerm = '';

    constructor(
        private wp: WordpressService,
        private router: Router
    ) { }

    ngOnInit() {
        console.log(this.results);
    }

    getSearchResult(ev: any) {
        const term = ev.target.value?.trim() || '';
        this.lastTerm = term;

        if (!term) {
            // If the search box is empty, reset everything
            this.loading = false;
            this.results = [];
            this.page = 1;
            return;
        }

        this.wp.getSearchResult(ev.target.value).subscribe({
            next: res => {
                this.results = res;
            },
            error: err => {
                console.log(err);
            }
        });
    }

    loadMore(event) {
        if (!this.lastTerm || this.loading) {
            event.target.complete();
            return;
        }
        this.loading = true;
        this.page++;

        this.wp.getPosts(this.page).subscribe({
            next: (res: any[]) => {
                this.results = [...this.results, ...res];
                event.target.complete();
                this.loading = false;

                // Disable infinite loading when maximum reached
                if (this.page === this.wp.pages) {
                    event.target.disabled = true;
                }
            },
            error: err => {
                this.loading = false;
                event.target.complete();
                event.target.disabled = true;
            }
        });
    }

    gotoPostDetailsPage(id) {
        this.router.navigate(['/post-details', id]);
    }
}
