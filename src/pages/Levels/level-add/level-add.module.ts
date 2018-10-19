import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LevelAddPage } from './level-add';

@NgModule({
  declarations: [
    LevelAddPage,
  ],
  imports: [
    IonicPageModule.forChild(LevelAddPage),
  ],
})
export class LevelAddPageModule {}
