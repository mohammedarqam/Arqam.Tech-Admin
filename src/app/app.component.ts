import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, AlertController } from 'ionic-angular';
import { DashboardPage } from '../pages/Extra/dashboard/dashboard';
import { LoginPage } from '../pages/Extra/login/login';
import * as firebase from 'firebase';
import { CategoriesViewPage } from '../pages/Categories/categories-view/categories-view';
import { UsersPage } from '../pages/Users/Users/users';
import { PostsPage } from '../pages/Posts/posts/posts';
import { LevelsPage } from '../pages/Levels/levels/levels';
import { PostEditPage } from '../pages/Posts/post-edit/post-edit';
import { PostViewPage } from '../pages/Posts/post-view/post-view';
import { AddPostsPage } from '../pages/Posts/add-posts/add-posts';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  activePage: any;

  full : boolean = true;

  pages: Array<{ title: string, component: any, icon: any, color : string }>;

  constructor(
  public platform: Platform,
  public toastCtrl : ToastController,
  public alertCtrl : AlertController,
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'DashBoard', component: DashboardPage, icon: "flash",color: "yellowi" },
      { title: 'Posts', component: PostsPage, icon: "md-paper",color: "whiter" },
      { title: 'Categories', component: CategoriesViewPage, icon: "ios-bookmark",color: "whiter" },
      { title: 'Levels', component: LevelsPage, icon: "ios-bookmark",color: "whiter" },
      { title: 'Users', component: UsersPage , icon: "ios-people",color: "whiter" },

    ];
    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        firebase.database().ref("Admin Data").child("Admins").child(user.uid).once('value',itemSnap=>{
            if(itemSnap.exists()){
              var welMsg = "Welcome"+" "+itemSnap.val().Name;
              this.rootPage = PostViewPage;
              this.presentToast(welMsg);
            }else{
              firebase.auth().signOut().then(()=>{
                this.rootPage = LoginPage;
                this.presentToast("You are not registered a Arqam.Tech Admin")
              })
            }
    });
      }
      else{
        this.rootPage = LoginPage;
      }
    });  
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;

  }
  checkActive(page) {
    return page == this.activePage;
  }

  confirmSignOut() {
    let alert = this.alertCtrl.create({
      title: 'Do you want to Log out ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Log out ?',
          handler: () => {
            this.signOut();
          }
        }
      ]
    });
    alert.present();
  }
  

  signOut() {
    firebase.auth().signOut().then(() => {
      this.nav.setRoot(LoginPage);
      this.presentToast("Signed Out");
    }).catch((error) => {
      console.log(error.message);
    });

 
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

collapse(){
  this.full = false;
}
expand(){
  this.full = true;
}



}
