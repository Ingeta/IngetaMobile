import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RelatedPostsComponent } from './related-posts.component';
import {ShellModule} from "../../shell/shell.module";

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, ShellModule],
  declarations: [RelatedPostsComponent],
  exports: [RelatedPostsComponent]
})
export class RelatedPostsModule { }
