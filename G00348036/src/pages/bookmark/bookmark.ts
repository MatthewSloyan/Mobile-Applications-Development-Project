import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {

  bookmarks: any[] = [];
  bookmarkLength:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {

    this.storage.get("BookmarkLength").then((data) => {
      if (data == null) 
      {
        console.log("Not in storage");
      } 
      else {
        this.bookmarkLength = data;
        console.log("Hello " + this.bookmarkLength);
      
        for (let i = 0; i <= this.bookmarkLength; i++) {
          this.storage.get("b" + i).then((data) => {
            if (data == null) 
            {
                console.log("Not in storage");
            } 
            else {
                this.bookmarks[i] = data;
                console.log(this.bookmarks);
            }
          })
          .catch((err) => {
            console.log("Error = " + err);
          })
        }
      } //else
    })
  } //ionViewDidLoad

  //======================================

  clearBookmarks(){
    for (let i = 0; i <= this.bookmarkLength; i++) {
      this.storage.remove("b" + i);
      this.storage.remove("BookmarkLength");
    }
  }
}
