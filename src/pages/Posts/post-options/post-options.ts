import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AddPostsPage } from '../add-posts/add-posts';


@IonicPage()
@Component({
  selector: 'page-post-options',
  templateUrl: 'post-options.html',
})
export class PostOptionsPage {

  post = this.navParams.get("post");

  constructor(
  public navCtrl: NavController, 
  public viewCtrl : ViewController,
  public modalCtrl : ModalController,
  public navParams: NavParams
  ) {
  }

  AddData(){
    this.navCtrl.push(AddPostsPage,{post :this.post} )
    this.close();
  }
  viewPost(){
    this.close();
  }

  editPost(){
    this.close();
  }

  delPost(){
    this.close();
  }


  close(){
    this.viewCtrl.dismiss();
  }

}
