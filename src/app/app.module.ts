import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import * as firebase from 'firebase';
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/Extra/dashboard/dashboard';
import { LoginPage } from '../pages/Extra/login/login';
import { AddCategoriesPage } from '../pages/Categories/add-categories/add-categories';
import { CategoriesViewPage } from '../pages/Categories/categories-view/categories-view';
import { UsersPage } from '../pages/Users/Users/users';
import { UserOptionsPage } from '../pages/Users/user-options/user-options';
import { UserDetailsPage } from '../pages/Users/user-details/user-details';
import { PostsPage } from '../pages/Posts/posts/posts';
import { AddPostsPage } from '../pages/Posts/add-posts/add-posts';
import { AddTitlePage } from '../pages/Posts/add-title/add-title';
import { PostEditPage } from '../pages/Posts/post-edit/post-edit';
import { PostViewPage } from '../pages/Posts/post-view/post-view';
import { PostOptionsPage } from '../pages/Posts/post-options/post-options';
import { LevelsPage } from '../pages/Levels/levels/levels';
import { LevelAddPage } from '../pages/Levels/level-add/level-add';

export const firebaseCred = {
  apiKey: "AIzaSyBirqKnWOtxUKau3VYbS2AZN_1UnIubHoY",
  authDomain: "arqamtechweb.firebaseapp.com",
  databaseURL: "https://arqamtechweb.firebaseio.com",
  projectId: "arqamtechweb",
  storageBucket: "arqamtechweb.appspot.com",
  messagingSenderId: "1069269221821"
};
firebase.initializeApp(firebaseCred);


@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    LoginPage,
    AddCategoriesPage,
    CategoriesViewPage,
    UsersPage,
    UserOptionsPage,
    UserDetailsPage,
    AddPostsPage,
    AddTitlePage,
    PostEditPage,
    PostOptionsPage,
    PostViewPage,
    PostsPage,
    LevelsPage,
    LevelAddPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    LoginPage,
    AddCategoriesPage,
    CategoriesViewPage,
    UsersPage,
    UserOptionsPage,
    UserDetailsPage,
    AddPostsPage,
    AddTitlePage,
    PostEditPage,
    PostOptionsPage,
    PostViewPage,
    PostsPage,
    LevelsPage,
    LevelAddPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
