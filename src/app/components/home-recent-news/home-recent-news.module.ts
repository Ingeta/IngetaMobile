import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeRecentNewsComponent } from './home-recent-news.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [
        HomeRecentNewsComponent
    ],
    exports: [
        HomeRecentNewsComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA   // ← permettre les custom elements
    ]
})
export class HomeRecentNewsModule { }
