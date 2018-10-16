import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostOptionsPage } from './post-options';

@NgModule({
  declarations: [
    PostOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(PostOptionsPage),
  ],
})
export class PostOptionsPageModule {}
