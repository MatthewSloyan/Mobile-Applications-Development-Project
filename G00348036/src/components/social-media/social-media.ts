import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'social-media',
  templateUrl: 'social-media.html'
})
export class SocialMediaComponent {

  text: string;
  colour: string = "light";

  constructor(public storage: Storage) {
    
  }

  ionViewWillEnter() {
    this.storage.get("Colour").then((data) => {
        if (data == null) 
        {
            console.log("Not in storage");
        } 
        else {
            this.colour = data;
            console.log("Component" + this.colour);
        }
    })
    .catch((err) => {
      console.log("Error = " + err);
    })
  }
}
