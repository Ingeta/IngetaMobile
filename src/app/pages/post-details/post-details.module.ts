import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostDetailsComponent } from './post-details.component';
import { PostDetailsRoutingModule } from './post-details-routing.module';
import { RelatedPostsModule } from '../../components/related-posts/related-posts.module';
import { CommentsModule } from '../../components/comments/comments.module';
import {ShellModule} from "../../shell/shell.module";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        PostDetailsRoutingModule,
        RelatedPostsModule,
        CommentsModule,
        ShellModule
    ],
  declarations: [PostDetailsComponent]
})
export class PostDetailsModule { }
