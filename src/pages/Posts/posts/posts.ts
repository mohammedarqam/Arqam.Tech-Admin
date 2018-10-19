import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AddTitlePage } from '../add-title/add-title';
import { PostOptionsPage } from '../post-options/post-options';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html',
})
export class PostsPage {

  postsRef = this.db.list('Posts', ref=>ref.orderByChild("TimeStamp"));
  posts: Array<any> = [];
  postsLoaded: Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public modalCtrl : ModalController,
  public popoverCtrl : PopoverController,
  private db : AngularFireDatabase,
  public navParams: NavParams,
  public alertCtrl : AlertController,
  ) {
    this.getPosts();
  }

  getPosts(){
    this.postsRef.snapshotChanges().subscribe(snap=>{
      let tempArray = [];
      snap.forEach(snp=>{
        let temp : any = snp.payload.val();
        temp.key = snp.key;

        switch (temp.Status) {
          case 'Draft':
              temp.clr = 'yellowi'
            break;
          case 'Published':
            temp.clr = 'secondary'
          break;
        }

        tempArray.push(temp);
        tempArray.reverse();
      })
      this.posts = tempArray;
      this.postsLoaded = tempArray;
    })
  }

  initializeItems(): void {
    this.posts = this.postsLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.posts = this.posts.filter((v) => {
      if((v.Title) && q) {
        if (v.Title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  viewOptions(myEvent,p){
    let popover = this.popoverCtrl.create(PostOptionsPage,{post : p});
    popover.present({
      ev: myEvent
    });
}


  addPostTitle(){
    let postTitle = this.modalCtrl.create(AddTitlePage,null,{enableBackdropDismiss : false});
    postTitle.present();
  }

  confirmStatusChange(p){
    let alterStatus : string;
    switch (p.Status) {
      case "Draft": alterStatus = "Publish";
        break;
      case "Published": alterStatus = "Unpublish";
        break;
    }

    let alert = this.alertCtrl.create({
      title: 'Do you want to '+alterStatus + '?',
      message: 'This post is '+p.Status + " now",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: alterStatus+'?',
          handler: () => {

            switch (p.Status) {
              case "Draft": this.publish(p.key);
                break;
              case "Published": this.Unpublish(p.key);
                break;
            }
        
          }
        }
      ]
    });
    alert.present();
  }


  publish(key){
    firebase.database().ref("Posts").child(key).child("Status").set("Published");
  }
  Unpublish(key){
    firebase.database().ref("Posts").child(key).child("Status").set("Draft");
  }

}
