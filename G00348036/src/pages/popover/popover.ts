import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  newsLength: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public storage: Storage) {
  }

  close() {
    this.viewCtrl.dismiss(); 
  }

  saveNewsItems() {
    this.storage.set("NewsLength", this.newsLength);
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

}
