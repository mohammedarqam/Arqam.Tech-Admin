import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTitlePage } from './add-title';

@NgModule({
  declarations: [
    AddTitlePage,
  ],
  imports: [
    IonicPageModule.forChild(AddTitlePage),
  ],
})
export class AddTitlePageModule {}
