import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchRecentNewsComponent } from './search-recent-news.component';
import {IonCard, IonCol, IonFab, IonFabButton, IonIcon, IonRow, IonSkeletonText} from '@ionic/angular/standalone';
import {ClampLinesPipe} from "../../pipes/clamp-lines.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
    ],
    declarations: [
        SearchRecentNewsComponent,
        ClampLinesPipe
    ],
    exports: [
        SearchRecentNewsComponent
    ]
})
export class SearchRecentNewsModule { }
