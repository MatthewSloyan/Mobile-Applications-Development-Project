import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewsPage } from '../pages/news/news';
import { SearchPage } from '../pages/search/search';
import { BookmarkPage } from '../pages/bookmark/bookmark';
import { SettingsPage } from '../pages/settings/settings';
import { SocialMediaComponent } from '../components/social-media/social-media';
import { PopoverPage } from '../pages/popover/popover';
import { GetNewsProvider } from '../providers/get-news/get-news';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewsPage,
    SearchPage, 
    BookmarkPage,
    SettingsPage,
    SocialMediaComponent,
    PopoverPage
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
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetNewsProvider,
    Camera,
    Geolocation
  ]
})
export class AppModule {}
