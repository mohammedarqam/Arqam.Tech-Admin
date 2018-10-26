import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-post-edit',
  templateUrl: 'post-edit.html',
})
export class PostEditPage {

  // ccode : string = "<button ion-button color";

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
  }


}
