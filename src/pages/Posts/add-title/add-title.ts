import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import * as moment from 'moment';
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

  levelRef = this.db.list('Extra Data/Levels');
  levels: Array<any> = [];
  levelSel : string;

  slug : string;
  slugValid : boolean = false;
  slugEdit : boolean = false;
  slugColor = "danger";

  catPostRef = firebase.database().ref("Categories");
  levelPostRef = firebase.database().ref("Levels");




  constructor(
  public navCtrl: NavController, 
  public viewCtrl : ViewController,
  public toastCtrl :ToastController,
  private db : AngularFireDatabase,
  public navParams: NavParams
  ) {
    this.getCats();
    this.getAuthor();
    this.getLevels();
    if(!this.slug){
      this.slugValid = false;
    }
  }

  getAuthor(){
    firebase.database().ref("Admin Data/Admins/"+firebase.auth().currentUser.uid).once('value',item=>{
      this.authName =  item.val().Name;
    })
  }

  checkData(){
    if(this.title){
      if(this.selCats.length){
        if(this.slugValid){
          this.cPost();  
        }else{
          this.presentTost("Slug already Exists");
        }
      }else{
        this.presentTost("Select a Category")
      }
    }else{
      this.presentTost("Enter a Post title")
    }
  }

  cPost(){
    this.postRef.child(this.slug).set({
      Title : this.title,
      Author : this.authName,
      Status : "Draft",
      Level : this.levelSel,
      Categories : this.selCats,
      TimeStamp : moment().format()
    }).then(()=>{
      this.authorPostRef.child(this.slug).set(true).then(()=>{
        for(let i=0;i<=this.selCats.length-1;i++){
          this.catPostRef.child(this.selCats[i]).child(this.slug).set(true);
        }
      }).then(()=>{
        this.levelPostRef.child(this.levelSel).child(this.slug).set(true);
      }) ;
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
        this.cats.push(temp.Name);
      })
    })
  }

  getLevels(){
    this.levelRef.snapshotChanges().subscribe(snap=>{
      this.levels = [];
      snap.forEach(snp=>{
        let temp : any = snp.payload.val();
        temp.key = snp.key;
        this.levels.push(temp.Name);
      })
    })
  }


  addCat(cat,i){
    this.selCats.push(cat);
    this.cats.splice(i,1);
  }
  rmCat(c,i){
    this.cats.push(c);
    this.selCats.splice(i,1);
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
  slugGen(){
    this.slug = this.title.toLowerCase().replace(/ /g, "-") ;
    this.slugValidation();
  }

  slugValidation(){
    if(this.slug.length){
      firebase.database().ref("Posts").child(this.slug).once("value",snap=>{
        if(!snap.exists()){
          this.slugValid = true;
          this.slugColor = "secondary";
        }else{
          this.slugValid = false;
          this.slugColor = "danger";
        }
      })
    }
  }
  showEditSlug(){
    this.slugEdit = true;
  }
  doneEditSlug(){
    this.slugEdit = false;
  }

}
