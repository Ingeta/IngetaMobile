import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeHotNewsComponent } from './home-hot-news.component';
import {ShellModule} from "../../shell/shell.module";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ShellModule],
  declarations: [HomeHotNewsComponent],
  exports: [HomeHotNewsComponent]
})
export class HomeHotNewsModule { }
