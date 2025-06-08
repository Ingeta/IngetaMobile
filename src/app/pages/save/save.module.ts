import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaveComponent } from './save.component';
import { SaveRoutingModule } from './save-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SaveRoutingModule
  ],
  declarations: [SaveComponent]
})
export class SaveModule { }
