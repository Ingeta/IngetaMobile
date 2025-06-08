import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StorageService } from '../../services/storage.service';
import { GlobalService } from '../../services/global.service';
import { WordpressService } from './../../services/wordpress.service';
import {NavController, Platform} from '@ionic/angular';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent implements OnInit {

    postId: any;
    postDetails: any;
    categories: any;
    websiteInfos: any;
    backSub: any;


    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private storageService: StorageService,
        private globalService: GlobalService,
        private wp: WordpressService,
        public navCtrl: NavController,
        private platform: Platform,
    ) { }

    ngOnInit() {
        // Get Slug URL
        this.route.params.subscribe(params => {
            this.postId = params.id;
        });
    }

    ionViewDidEnter() {
        this.getPostDetails();
        this.getWebsiteInfos();

        // subscribe to the android back button
        this.backSub = this.platform.backButton.subscribeWithPriority(10, () => {
            // this.navCtrl.back() will call location.back() under the hood
            this.navCtrl.back();
        });
    }

    // Get Post Details By Post ID
    getPostDetails() {
        this.wp.getPostDetailsById(this.postId).subscribe(res => {
            this.postDetails = res;
            this.categories = res.categories;
        });
    }

    getWebsiteInfos() {
        this.wp.getWebsiteInfo().subscribe(res => {
            this.websiteInfos = res;
        });
    }

    // Save Article Function
    saveArticle() {
        this.storageService.setObject(this.postDetails);
        this.globalService.presentAlert('Succès',
            'Cet article a été sauvegardé. Retrouvez vos articles dans l’onglet Articles sauvegardés.');
    }

    ionViewWillLeave() {
        // prevent multiple subscriptions piling up
        this.backSub.unsubscribe();
    }
}
