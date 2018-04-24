import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class LengthColourProvider {

  newsLength: number = 20;

  constructor(private storage: Storage) {
  }

  //gets the number of news items to return on the page from storage, it is used across multiple pages
  getNewsLength():number{

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

    return this.newsLength;
  }

  //I tried to get the provider working with colour on the home page and it did, but it didn't load fast enough when loading the page
  //so it always needed a refresh so I left it out.
}
