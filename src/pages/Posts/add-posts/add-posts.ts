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
  status : string;
  StatMon : string;

  prioC : number=0;

  contnt : string;
  prio : string;
  stle : string="head1";

  postRef =this.db.list(`Content/${this.post.key}`);
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
      this.prioC=0;
      this.prio = this.prioC.toString();
      snap.forEach(snp=>{
        let temp : any = snp.payload.val();
        temp.Priority = snp.key;
        this.postView.push(temp);
        this.prioC++;
        this.prio = this.prioC.toString();
      })
    })

  }

  statMonitor(){

    switch (this.status) {
      case "Published": this.StatMon = "Unpublish";
        break;
      case "Draft": this.StatMon = "Publish";
        break;
    
    }
  }

  getPostAtt(){
    firebase.database().ref("Posts").child(this.post.key).once('value',snap=>{
      this.pName = snap.val().Title;
      this.time= snap.val().TimeStamp;
      this.status = snap.val().Status;
    }).then(()=>{
      this.statMonitor();
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
        if(this.stle){
          this.addContent();
        }else{
          this.presentToast("Enter Style");
        }
    }else{
      this.presentToast("Enter Content");
    }
  }

  addContent(){
    firebase.database().ref("Content").child(this.post.key).child(this.prio).set({
      Data : this.contnt,
      Stle : this.stle,
    }).then(()=>{
      this.prioC++;
      this.prio = this.prioC.toString();
      this.clear();
    })
  }

  clear(){
    this.contnt = null;
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
  
  publish(){
    firebase.database().ref("Posts").child(this.post.key).child("Status").set("Published").then(()=>{
      this.getPostAtt();
    });
  }
  Unpublish(){
    firebase.database().ref("Posts").child(this.post.key).child("Status").set("Draft").then(()=>{
      this.getPostAtt();
    });
  }
}
