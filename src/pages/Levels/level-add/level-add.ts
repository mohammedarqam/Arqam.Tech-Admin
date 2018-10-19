import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-level-add',
  templateUrl: 'level-add.html',
})
export class LevelAddPage {

  name : string;
  levelRef = firebase.database().ref("Extra Data/Levels");
  constructor(
  public navCtrl: NavController, 
  public viewCtrl : ViewController,
  public toastCtrl : ToastController,
  public navParams: NavParams
  ) {
  }


  checkData(){
    if(this.name){
      this.addLevel();
    }else{  
      this.presentToast("Add a label for Level")
    }
  }

  close(){
    this.viewCtrl.dismiss();
  }

  addLevel(){
    this.levelRef.push({
      Name : this.name,
      TimeStamp : moment().format()
    }).then(()=>{
      this.presentToast("Level Added")
      this.close();
    })
  }

 presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    position :"bottom"
    
  });
  toast.present();
}
capsName(name){
  this.name = name.toLowerCase().replace(/ /g, "-") ;
}
}