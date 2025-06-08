import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PodcastsComponent } from './podcasts.component';
import { PodcastsRoutingModule } from './podcasts-routing.module';
import {ShellModule} from "../../shell/shell.module";


@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        PodcastsRoutingModule,
        ShellModule
    ],
    declarations: [
        PodcastsComponent
    ]
})
export class PodcastsModule { }
