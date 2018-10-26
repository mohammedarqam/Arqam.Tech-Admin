import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-post-view',
  templateUrl: 'post-view.html',
})
export class PostViewPage {
  postKey : string = "one";
  postRef =firebase.database().ref("Content").child(this.postKey);

  taig : string;
  taigEnd : string;

  //booleans
  btnbool : boolean = false;
  linkbool : boolean = false;
  linkextr : boolean = false;
  codebool : boolean = false;
  imagebool : boolean = false;


  //String;
  btnText : string;
  linkText : string;
  linkLink : string;
  codeText : string;
  imageName : string;

  constructor(
  public navCtrl: NavController, 
  public navParams: NavParams
  ) {
  }


  //addFunctions
  addBtn(){
    this.taig = "<ion-button>";
    this.taigEnd = "</ion-button>";
    this.postRef.child("0").set({
      Data : this.taig+this.btnText+this.taigEnd,
    }).then(()=>{
      this.btnbool  = false;
      this.btnText = null;
      this.cancel();
    })
  }

  addLink(){
    console.log(this.linkextr);
    let p1 = "<a href='";
    let p2 =  "'";
    let p3 = ">"
    if(this.linkextr){
      p3 = "target='_blank'"
    }
    let p4 = "<p>";
    this.taig = p1+this.linkLink+p2+p3+p4;
    this.taigEnd = "</p></a>";
    this.postRef.child("1").set({
      Data :this.taig+this.linkText+this.taigEnd,
    }).then(()=>{
      this.linkbool  = false;
      this.linkText = null;
      this.linkLink = null;
      this.linkextr = false;
      this.cancel();
    })
  }


  addCode(){
    this.taig ="<ion-card color='dark'><ion-card-content><p> ";
    this.taigEnd = "</p></ion-card-content></ion-card>";
    this.postRef.child("3").set({
      Data : this.taig+this.codeText+this.taigEnd,
      Cls : "CodeClass",
    }).then(()=>{
      this.codebool  = false;
      this.codeText = null;
      this.cancel();
    })
  }

  addImage(){
    // this.taig ="<ion-card><img src=' ";
    this.taigEnd = "</p></ion-card-content></ion-card>";
    this.postRef.child("3").set({
      Data : this.taig+this.codeText+this.taigEnd,
      Cls : "CodeClass",
    }).then(()=>{
      this.codebool  = false;
      this.codeText = null;
      this.cancel();
    })
  }












  cancel(){
    this.taig = null;
    this.taigEnd = null;
  }

}
