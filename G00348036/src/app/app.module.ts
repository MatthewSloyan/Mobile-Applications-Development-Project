import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
//Pages
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { SearchPage } from '../pages/search/search';
import { BookmarkPage } from '../pages/bookmark/bookmark';
import { SettingsPage } from '../pages/settings/settings';
import { PopOverPage } from '../pages/pop-over/pop-over';
//components
import { SocialMediaComponent } from '../components/social-media/social-media';
//providers
import { GetNewsProvider } from '../providers/get-news/get-news';
import { SaveBookmarkProvider } from '../providers/save-bookmark/save-bookmark';
//plugins and extras
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Vibration } from '@ionic-native/vibration';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewsPage,
    SearchPage, 
    BookmarkPage,
    SettingsPage,
    SocialMediaComponent,
    PopOverPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewsPage,
    SearchPage, 
    BookmarkPage,
    SettingsPage,
    PopOverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetNewsProvider,
    SaveBookmarkProvider,
    Geolocation,
    Camera,
    AndroidPermissions, 
    Vibration
  ]
})
export class AppModule {}
