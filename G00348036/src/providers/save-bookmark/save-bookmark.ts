import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SaveBookmarkProvider {

  bookmarkLength:number = 0;

  constructor(private storage: Storage) {
  }

  //pass in the data for the news items to be saved
  saveBookmark(image:string, url:string, title:string, description:string, source:string): number{

    //get the length of the bookmark list
    this.storage.get("BookmarkLength").then((data) => {
      if (data == null) 
      {
        //if it's null, then there is no elements in the bookmark page so start the count
        console.log("Not in storage");
        this.countBookmarkItems();
      } 
      else {
        //otherwise set the length to the value in local storage to continue from
        this.bookmarkLength = data;

        //add one to the bookmark lenght
        this.countBookmarkItems();
      }
        //set the data in storage using the length, so if length = 2, then it will be saved as b2 and so on.
        this.storage.set("b" + this.bookmarkLength, {"Image": image, "Url": url, "Title": title, "Description": description, "Source":source });
        console.log("Bookmark length home" + this.bookmarkLength);
    })

    return this.bookmarkLength;
  }

  countBookmarkItems() {
    //increment the lenght by one
    this.storage.set("BookmarkLength", this.bookmarkLength + 1);
  } 
}
