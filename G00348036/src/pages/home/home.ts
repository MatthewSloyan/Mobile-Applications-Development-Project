import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsPage } from '../../pages/news/news';
import { SearchPage } from '../../pages/search/search';
import { BookmarkPage } from '../../pages/bookmark/bookmark';
import { SettingsPage } from '../../pages/settings/settings';

import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';

import { GetNewsProvider } from '../../providers/get-news/get-news'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news: any[] = [];

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private n: GetNewsProvider) {

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
    });
  }

  ionViewDidLoad(){
    this.n.getNewsData("ie", "").subscribe(data => 
    {
      this.news = data.articles;
    });
  }
}

