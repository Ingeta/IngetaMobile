import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import {ShellModule} from "../../shell/shell.module";


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        PostsRoutingModule,
        ShellModule
    ],
    declarations: [
        PostsComponent
    ]
})
export class PostsModule { }
