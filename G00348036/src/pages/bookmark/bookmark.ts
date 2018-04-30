import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
})
export class BookmarkPage {

  bookmarks: any[] = [];
  bookmarkLength:number = 0;
  colour: string = "primary";
  buttonOnOff: boolean = true;

  constructor(private storage: Storage) {
  }

  ionViewWillEnter() {

    //get the colour from storage
    this.storage.get("Colour").then((data) => {
      if (data == null) 
          console.log("Not in storage");
      else
          this.colour = data;
    })
    .catch((err) => {
      console.log("Error = " + err);
    })

    //get the bookmark lenght, if null then there is no elements.
    //else retrieve the length
    this.storage.get("BookmarkLength").then((data) => {
      if (data == null) 
      {
        console.log("Not in storage");
      } 
      else {
        this.bookmarkLength = data;

        //turn the button on/off using interpolation depending if there is 0 or more bookmarks present
        if (this.bookmarkLength != 0){
          this.buttonOnOff = false;
        }
        else {
          this.buttonOnOff = true;
          console.log(this.bookmarkLength);
        }
      
        //loop through each stored bookmark to get it's data and load it into the bookmarks array
        //values start at b0, b1, b2 etc.
        for (let i = 0; i <= this.bookmarkLength; i++) {
          this.storage.get("b" + i).then((data) => {
            if (data == null) 
            {
                console.log("Not in storage");
            } 
            else {
                this.bookmarks[i] = data;
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

  //loop through the storage elements and clear each one
  clearBookmarks(){
    for (let i = 0; i <= this.bookmarkLength; i++) {
      this.storage.remove("b" + i);
      this.storage.remove("BookmarkLength");
    }
  }
}
