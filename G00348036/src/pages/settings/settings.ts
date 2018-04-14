import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  newsLength: number;
  colour: string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  saveNewsItems() {
    this.storage.set("NewsLength", this.newsLength);
    console.log(this.newsLength);
  } 

  saveColour() {
    this.storage.set("Colour", this.colour);
    console.log(this.colour);
  } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
