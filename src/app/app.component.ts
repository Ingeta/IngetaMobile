import { Component } from '@angular/core';
import {AlertController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar, Style } from '@capacitor/status-bar';
import { MenusService } from './services/menus.service';
import { WordpressService } from './services/wordpress.service';
import { register } from 'swiper/element/bundle';
import {environment} from '../environments/environment';
import { App as CapacitorApp } from '@capacitor/app';
import {PlaybackService} from "./services/playback.service";
register();


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    public appPages = [];
    websiteInfos: any;
    appVersion = environment.appVersion;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private menusService: MenusService,
        private wp: WordpressService,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        public playbackService: PlaybackService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // 1) Make the StatusBar push your webview content below itself
            StatusBar.setOverlaysWebView({ overlay: false });

            // 2) Pick a dark‐icon style for a light background (or Style.Light for white icons)
            StatusBar.setStyle({ style: Style.Light });

            // 3) Paint the bar #740d11
            StatusBar.setBackgroundColor({ color: '#740d11' });
            this.splashScreen.hide();

            // Get Menus For Side Menu
            this.appPages = this.menusService.getPages();
            this.getWebsiteInfos();

            this.platform.backButton.subscribeWithPriority(5, async () => {
                const alert = await this.alertCtrl.create({
                    header: 'Quitter l’application ?',
                    message: 'Voulez-vous vraiment fermer l’application ?',
                    buttons: [
                        { text: 'Non', role: 'cancel' },
                        {
                            text: 'Oui',
                            handler: () => {
                                CapacitorApp.exitApp();
                            }
                        }
                    ]
                });
                await alert.present();
            });
        });
    }

    getWebsiteInfos() {
        this.wp.getWebsiteInfo().subscribe(res => {
            this.websiteInfos = res;
        });
    }

    onTrackEnded(evt: any) {
        // auto-advance in your service
        this.playbackService.next();
    }
}
