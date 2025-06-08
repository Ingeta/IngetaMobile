import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchCategoriesComponent } from './search-categories.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [SearchCategoriesComponent],
  exports: [SearchCategoriesComponent]
})
export class SearchCategoriesModule { }