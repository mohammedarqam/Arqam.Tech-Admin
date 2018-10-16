import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-add-posts',
  templateUrl: 'add-posts.html',
})
export class AddPostsPage {

  post = this.navParams.get("post");


  pName : string = '';
  time: string;
  authKey : string = firebase.auth().currentUser.uid;
  authName: string;
  showAdd : boolean = false;

  contnt : string;
  prio : string;
  stle : string;

  postRef =this.db.list(`Posts/${this.post.key}/Content`);
  postView : Array<any> = [];

  constructor(
  public navCtrl: NavController, 
  public db :AngularFireDatabase,
  public toastCtrl : ToastController,
  public menuCtrl : MenuController,
  public navParams: NavParams
  ) {
    this.getPostAtt();
    this.getPost();
  }

  getPost(){
    this.postRef.snapshotChanges().subscribe(snap=>{
      this.postView = [];
      snap.forEach(snp=>{
        let temp : any = snp.payload.val();
        temp.Priority = snp.key;
        this.postView.push(temp);
      })
    })

  }


  getPostAtt(){
    firebase.database().ref("Posts").child(this.post.key).once('value',snap=>{
      this.pName = snap.val().Title;
      this.time= snap.val().TimeStamp;
    }).then(()=>{
      this.getAuthor();
    })
  }

  getAuthor(){
    firebase.database().ref("Admin Data/Admins").child(this.authKey).once("value",snap=>{
      this.authName = snap.val().Name;
    })
  }

  testData(){
    if(this.contnt){
      if(this.prio){
        if(this.stle){
          this.addContent();
        }else{
          this.presentToast("Enter Style");
        }
      }else{
        this.presentToast("Enter Priority");
      }
    }else{
      this.presentToast("Enter Content");
    }
  }

  addContent(){
    firebase.database().ref("Posts").child(this.post.key).child("Content").child(this.prio).set({
      Data : this.contnt,
      Stle : this.stle,
    }).then(()=>{
      this.clear();
    })
  }

  clear(){
    this.contnt = null;
    this.prio = null;
    this.stle = null;
  }

  showAddBtn(){
    this.showAdd = true;
  }

  hideAddBtn(){
    this.showAdd = false;
    this.clear();
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position : "top",
      showCloseButton: false,
    });
    toast.present();
  }
  

}
