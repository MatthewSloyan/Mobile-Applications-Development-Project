import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsPage } from '../../pages/news/news';
import { ReviewsPage } from '../../pages/reviews/reviews';
import { SettingsPage } from '../../pages/settings/settings';

import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {

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
  openReviewsPage() {
      this.navCtrl.push(ReviewsPage);
    } 
  openSettingsPage() {
      this.navCtrl.push(SettingsPage);
    }
}
