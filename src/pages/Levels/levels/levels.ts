import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import { LevelAddPage } from '../level-add/level-add';


@IonicPage()
@Component({
  selector: 'page-levels',
  templateUrl: 'levels.html',
})
export class LevelsPage {

  levelsRef =this.db.list('Extra Data/Levels');
  levels: Array<any> = [];
  levelsLoaded: Array<any> = [];



  LevRef = firebase.database().ref("Extra Data/Levels");

  constructor(
  public navCtrl: NavController, 
  public db : AngularFireDatabase,
  public toastCtrl : ToastController,
  public alertCtrl: AlertController,
  public modalCtrl : ModalController,
  public navParams: NavParams
  ) {
    this.getLevels();
  }

  getLevels(){
    this.levelsRef.snapshotChanges().subscribe(snap=>{
      let tempArray = [];
      snap.forEach(snp=>{
        let temp : any = snp.payload.val();
        temp.key = snp.key;
        // firebase.database().ref("Categories").child(temp.Name).once("value",snip=>{
        //   temp.Count = snip.numChildren();
        // })
        tempArray.push(temp);
      })
      this.levels = tempArray;
      this.levelsLoaded = tempArray;
    })

  }

  initializeItems(): void {
    this.levels = this.levelsLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.levels = this.levels.filter((v) => {
      if(v.Name && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }



  gtAddLevel(){
    let levAdd = this.modalCtrl.create(LevelAddPage,null,{enableBackdropDismiss : false});
    levAdd.present();
  }


  deleteLevel(lev) {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Delete this Level ?',
      message: 'This level cannot be recovered again',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: 'Yes, I understand',
          handler: () => {
            this.delete(lev);
          }
        }
      ]
    });
    confirm.present();
  }


  delete(banner) {

      this.LevRef.child(banner.key).remove().then(() => {
        this.presentToast('Level Deleted');
      });
 }

 presentToast(msg) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: 4000,
    position :"bottom"
    
  });
  toast.present();
}


}
