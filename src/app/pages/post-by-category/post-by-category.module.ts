import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostByCategoryComponent } from './post-by-category.component';
import { PostByCategoryRoutingComponent } from './post-by-category-routing.module';
import {ShellModule} from "../../shell/shell.module";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        PostByCategoryRoutingComponent,
        ShellModule
    ],
  declarations: [PostByCategoryComponent]
})
export class PostByCategoryModule { }
