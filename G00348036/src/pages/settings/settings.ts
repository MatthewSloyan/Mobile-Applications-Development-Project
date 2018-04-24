import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  newsLength: number;
  colour: string;
  name:string;
  
  constructor(private storage: Storage) {
  }

  //save the user inputs to storage (data persistance)
  saveNewsItems() {
    this.storage.set("NewsLength", this.newsLength);
  } 

  saveColour() {
    this.storage.set("Colour", this.colour);
  }

  saveName() {
    this.storage.set("Name", this.name);
  } 
}
