import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { AddPostsPage } from '../add-posts/add-posts';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-add-title',
  templateUrl: 'add-title.html',
})
export class AddTitlePage {

  aid = firebase.auth().currentUser.uid;
  authName : string = '';
  title : string;
  postRef = firebase.database().ref("Posts");
  authorPostRef = firebase.database().ref("Authors").child(this.aid);

  catRef = this.db.list('Extra Data/Post Categories');
  cats: Array<any> = [];
  selCats : Array<any> = [];
  public pkey : string = null;

  constructor(
  public navCtrl: NavController, 
  public viewCtrl : ViewController,
  public toastCtrl :ToastController,
  private db : AngularFireDatabase,
  public navParams: NavParams
  ) {
    this.getCats();
    this.getAuthor();
  }

  getAuthor(){
    firebase.database().ref("Admin Data/Admins/"+firebase.auth().currentUser.uid).once('value',item=>{
      this.authName =  item.val().Name;
    })
  }

  checkData(){
    if(this.title){
      this.cPost();  
    }else{
      this.presentTost("Enter a Post title")
    }
  }

  cPost(){
    this.postRef.push({
      Title : this.title,
      Author : this.authName,
      Status : "Draft",
      Categories : this.selCats,
      TimeStamp : moment().format()
    }).then((res)=>{
      this.pkey = res.key;
      this.authorPostRef.child(res.key).set(true);
    }).then(()=>{
      this.close();
    })  
  }


  getCats(){
    this.catRef.snapshotChanges().subscribe(snap=>{
      this.cats = [];
      snap.forEach(snp=>{
        let temp : any = snp.payload.val();
        temp.key = snp.key;
        this.cats.push(temp);
      })
    })
  }
  

  presentTost(msg){
    let toast = this.toastCtrl.create({
      message : msg,
      duration :3000,
      position : "top",
    })  
    toast.present();
  }

  close(){
    this.viewCtrl.dismiss();
  }
}
