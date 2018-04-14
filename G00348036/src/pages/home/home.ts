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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news: any[] = [];
  newsLength: number = 20;
  colour: string = "primary";

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private n: GetNewsProvider, public storage: Storage) {
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
      let count:number = 0;

      this.news = data.articles;
      this.news.length = this.newsLength;

      for (let n of this.news) {
        if(this.news[count].urlToImage == null)
        {
          this.news[count].urlToImage = "https://cdn3.iconfinder.com/data/icons/communication-icons-3/512/Newspaper-512.png";          
        }
        count++;
      }

      console.log(this.news);
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
  }

  ionViewDidLoad(){
    this.n.getNewsData("ie", "").subscribe(data => 
    {
      let count:number = 0;

      this.news = data.articles;
      this.news.length = this.newsLength;

      for (let n of this.news) {
        if(this.news[count].urlToImage == null)
        {
          this.news[count].urlToImage = "https://cdn3.iconfinder.com/data/icons/communication-icons-3/512/Newspaper-512.png";          
        }
        count++;
      }
      console.log(this.news);
    });
  }
}

