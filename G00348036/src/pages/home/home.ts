import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsPage } from '../../pages/news/news';
import { SearchPage } from '../../pages/search/search';
import { BookmarkPage } from '../../pages/bookmark/bookmark';
import { SettingsPage } from '../../pages/settings/settings';

import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';

import { GetNewsProvider } from '../../providers/get-news/get-news'
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news: any[] = [];
  newsLength: number = 20;
  colour: string = "primary";
  name: string = "";
  base64Image;

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private n: GetNewsProvider, public storage: Storage, private camera: Camera) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  openNewsPage() {
      this.navCtrl.push(NewsPage);
    } 
  openSearchPage() {
    this.navCtrl.push(SearchPage);
  }
  openBookmarkPage() {
      this.navCtrl.push(BookmarkPage);
    } 
  openSettingsPage() {
      this.navCtrl.push(SettingsPage);
    }

  loadNews(country:string, category:string){
    this.n.getNewsData(country, category).subscribe(data => 
    {
      this.news = data.articles;
      this.news.length = this.newsLength;

      for (let image of this.news) {
        if(image.urlToImage == null)
        {
          image.urlToImage = "https://cdn3.iconfinder.com/data/icons/communication-icons-3/512/Newspaper-512.png";          
        }
     }
    });
  }

  ionViewWillEnter() {
    this.storage.get("NewsLength").then((data) => {
        if (data == null) 
        {
            console.log("Not in storage");
        } 
        else {
            this.newsLength = data;
        }
      })
     .catch((err) => {
        console.log("Error = " + err);
      })

    this.storage.get("Colour").then((data) => {
        if (data == null) 
        {
            console.log("Not in storage");
        } 
        else {
            this.colour = data;
        }
    })
    .catch((err) => {
      console.log("Error = " + err);
    })

    this.storage.get("Name").then((data) => {
      if (data == null) 
      {
          console.log("Not in storage");
      } 
      else {
          this.name = data;
      }
    })
    .catch((err) => {
      console.log("Error = " + err);
    })
  }

  ionViewDidLoad(){
    this.n.getNewsData("ie", "").subscribe(data => 
    {
      this.news = data.articles;
      this.news.length = this.newsLength;

      for (let image of this.news) {
        if(image.urlToImage == null)
        {
          image.urlToImage = "https://cdn3.iconfinder.com/data/icons/communication-icons-3/512/Newspaper-512.png";          
        }
     }
      console.log(this.news);
    });
  }

  openCamera(){
    const options: CameraOptions = {
      quality: 75,
      allowEdit : true,
      targetWidth: 300,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
  
}

