import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AspectRatioComponent } from './aspect-ratio/aspect-ratio.component';
import { ImageShellComponent } from './image-shell/image-shell.component';
import { AppShellConfig } from './config/app-shell.config';

@NgModule({
    declarations: [
        AspectRatioComponent,
        ImageShellComponent,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (appShellConfig: AppShellConfig) => {
                return () => appShellConfig.load();
            },
            deps: [AppShellConfig],
            multi: true
        }
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        IonicModule
    ],
    exports: [
        AspectRatioComponent,
        ImageShellComponent
    ]
})
export class ShellModule { }
