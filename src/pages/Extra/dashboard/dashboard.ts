import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase} from '@angular/fire/database';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  users : number = 0;
  usersRef = this.db.list("User Data/Users");
  cats : number = 0;
  catsRef = this.db.list("Extra Data/Post Categories");
  posts : number = 0;
  postsRef = this.db.list("Posts");

  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    private menuCtrl : MenuController) {
      this.menuCtrl.enable(true);
      this.getUsers();
      this.getCats();
      this.getPosts();
    }

  getUsers(){
    this.usersRef.snapshotChanges().subscribe(snap=>{
      this.users = snap.length;
    })
  }
  getCats(){
    this.catsRef.snapshotChanges().subscribe(snap=>{
      this.cats = snap.length;
    })
  }
  getPosts(){
    this.postsRef.snapshotChanges().subscribe(snap=>{
      this.posts = snap.length;
    })
  }
}
