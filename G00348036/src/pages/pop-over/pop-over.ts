import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'pop-over.html',
})
export class PopOverPage {

  newsLength: number;

  constructor( private viewCtrl: ViewController, private storage: Storage) {
  }

  //close the popover page
  close() {
    this.viewCtrl.dismiss(); 
  }

  //save the selected length to storage
  saveNewsItems() {
    this.storage.set("NewsLength", this.newsLength);
  } 
}
