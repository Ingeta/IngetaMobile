import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeCategoriesComponent } from './home-categories.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [
        HomeCategoriesComponent
    ],
    exports: [
        HomeCategoriesComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA   // ← permettre les custom elements
    ]
})
export class HomeCategoriesModule { }
