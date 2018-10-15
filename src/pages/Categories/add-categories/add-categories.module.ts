import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCategoriesPage } from './add-categories';

@NgModule({
  declarations: [
    AddCategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCategoriesPage),
  ],
})
export class AddCategoriesPageModule {}
