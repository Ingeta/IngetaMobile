import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchCategoriesModule } from '../../components/search-categories/search-categories.module';
import { SearchRecentNewsModule } from '../../components/search-recent-news/search-recent-news.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SearchRoutingModule,
    SearchCategoriesModule,
    SearchRecentNewsModule
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
