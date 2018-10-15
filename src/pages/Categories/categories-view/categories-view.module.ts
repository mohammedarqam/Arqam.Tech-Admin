import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriesViewPage } from './categories-view';

@NgModule({
  declarations: [
    CategoriesViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriesViewPage),
  ],
})
export class CategoriesViewPageModule {}
