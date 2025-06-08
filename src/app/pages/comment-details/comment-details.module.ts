import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentDetailsComponent } from './comment-details.component';
import { CommentDetailsRoutingModule } from './comment-details-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CommentDetailsRoutingModule
  ],
  declarations: [CommentDetailsComponent]
})
export class CommentDetailsModule { }
