import { Component, OnInit } from '@angular/core';
import { WordpressService } from '../../services/wordpress.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

    websiteInfos: any;

    constructor(private wp: WordpressService) { }

    ngOnInit() {
        this.getWebsiteInfos();
    }

    getWebsiteInfos() {
        this.wp.getWebsiteInfo().subscribe(res => {
            this.websiteInfos = res;
        });
    }

}
