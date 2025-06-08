import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-save',
    templateUrl: './save.component.html',
    styleUrls: ['./save.component.scss'],
})
export class SaveComponent implements OnInit {

    posts: any = [];

    constructor(
        private storageService: StorageService,
        private globalService: GlobalService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getSavedPosts();
    }

    ionViewWillEnter() {
        this.getSavedPosts();
    }

    // Get Saved Posts From Local Storage
    async getSavedPosts() {
        await this.storageService.getObject().then((data) => {
            if (data) {
                this.posts = data;
            } else {
                this.posts = [];
            }
        });
    }

    // Clear Storage
    async clearStorageArticles() {
        this.storageService.clear();
        await this.globalService.presentAlert('Succès', 'Vous avez supprimé tous vos articles sauvegardés.');
        this.getSavedPosts();
    }

    // Go To Post Details Page
    async gotoPostDetailsPage(id) {
        this.router.navigate(['/post-details', id]);
    }
}
