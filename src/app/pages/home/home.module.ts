import { IonicModule } from '@ionic/angular';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeCategoriesModule } from '../../components/home-categories/home-categories.module';
import { HomeRecentNewsModule } from '../../components/home-recent-news/home-recent-news.module';
import { HomeHotNewsModule } from '../../components/home-hot-news/home-hot-news.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        HomeRoutingModule,
        HomeCategoriesModule,
        HomeRecentNewsModule,
        HomeHotNewsModule
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA   // ← permettre les custom elements
    ]
})
export class HomeModule { }
