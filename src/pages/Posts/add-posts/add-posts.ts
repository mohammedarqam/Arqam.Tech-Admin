import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-add-posts',
  templateUrl: 'add-posts.html',
})
export class AddPostsPage {

  postKey = "something-with-level";//this.navParams.get("post");


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

  postRef =firebase.database().ref("Content").child(this.postKey);
  postView : Array<any> = [];

  tag : string ;
  tagEnd :string;

  getTags(tagSel){
    this.showAddBtn();
    switch (tagSel) {
      case "btn": this.tag = "<ion-button>";this.tagEnd = "</ion-button>";
        break;
    }
  }


  constructor(
  public navCtrl: NavController, 
  public db :AngularFireDatabase,
  private sanitizer: DomSanitizer,
  public toastCtrl : ToastController,
  public menuCtrl : MenuController,
  public navParams: NavParams
  ) {
    this.getPostAtt();
    this.getPost();
  }

  getPost(){
    this.postRef.once("value",snap=>{
      this.postView = [];
      this.prioC=0;
      this.prio = this.prioC.toString();
      snap.forEach(snp=>{
        let temp : any = snp.val();
        temp.Priority = snp.key;
        // temp.Data = this.sanitizer.bypassSecurityTrustHtml()
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
    firebase.database().ref("Posts").child(this.postKey).once('value',snap=>{
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
    firebase.database().ref("Content").child(this.postKey).child(this.prio).set({
      Data : this.tag+this.contnt+this.tagEnd,
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
    firebase.database().ref("Posts").child(this.postKey).child("Status").set("Published").then(()=>{
      this.getPostAtt();
    });
  }
  Unpublish(){
    firebase.database().ref("Posts").child(this.postKey).child("Status").set("Draft").then(()=>{
      this.getPostAtt();
    });
  }
}
