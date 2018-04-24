import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewsPage } from '../../pages/news/news';
import { SearchPage } from '../../pages/search/search';
import { BookmarkPage } from '../../pages/bookmark/bookmark';
import { SettingsPage } from '../../pages/settings/settings';
import { PopoverController } from 'ionic-angular';
import { PopOverPage } from '../pop-over/pop-over';
import { GetNewsProvider } from '../../providers/get-news/get-news'
import { SaveBookmarkProvider } from '../../providers/save-bookmark/save-bookmark';
import { LengthColourProvider } from '../../providers/length-colour/length-colour';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Vibration } from '@ionic-native/vibration';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  news: any[] = [];
  newsLength: number = 20;
  colour: string = "primary";
  name: string = "";
  base64Image;
  bookmarkLength:number = 0;

  constructor(private navCtrl: NavController, private popoverCtrl: PopoverController, private n: GetNewsProvider,
    private b: SaveBookmarkProvider, private lc: LengthColourProvider, private storage: Storage, 
    private camera: Camera, private vibration: Vibration) {
  }

  //load the popover page when the more icon is selected in the top right hand corner, this is another place for the
  //user to change the number of news items displayed
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopOverPage);

    popover.present({
      ev: myEvent
    });

    //testing method call to clear storage
    //this.clearStorage();
  }

  //navigation methods, that push each page onto the stack
  openNewsPage() {
      this.navCtrl.push(NewsPage);
    } 
  openSearchPage() {
    this.navCtrl.push(SearchPage);
  }
  openBookmarkPage() {
      this.navCtrl.push(BookmarkPage);
    } 
  openSettingsPage() {
      this.navCtrl.push(SettingsPage);
    }

  //=============================================

  //pass in the data from home.html for the specific news item and call the saveBookmarks provider to add to storage.
  bookmark(image:string, url:string, title:string, description:string, source:string){

    this.bookmarkLength = this.b.saveBookmark(image, url, title, description, source);

    this.vibration.vibrate(100);
  }

  //testing method to clear the storage
  // clearStorage() {
  //   this.storage.clear();
  // } 

  //============================================

  //load the news based on the menu selected, whether it is for US, UK etc
  loadNews(country:string, category:string){
    
    //this.ionViewWillEnter();

    this.n.getNewsData(country, category).subscribe(data => 
    {
      this.news = data.articles;
      this.news.length = this.newsLength; //set the lenth of the array to the length specified by the user.

       //loop through the array to replace any null images with a default one.
      for (let image of this.news) {
        if(image.urlToImage == null)
        {
          image.urlToImage = "https://cdn3.iconfinder.com/data/icons/communication-icons-3/512/Newspaper-512.png";          
        }
     }
    });
  }

  //===========================================

  ionViewWillEnter() {
    //call the lengthColour provider to load the news list length
    this.newsLength = this.lc.getNewsLength();

    //I tried to get the provider working with colour on the home page and it did, but it didn't load fast enough when loading the page
    //so it always needed a refresh whereas it works seamlessly this way
    this.storage.get("Colour").then((data) => {
        if (data == null) 
            console.log("Not in storage");
        else
            this.colour = data;
    })
    .catch((err) => {
      console.log("Error = " + err);
    })

    //get the users name from storage, this can be edited on the settings page
    this.storage.get("Name").then((data) => {
      if (data == null) 
      {
          console.log("Not in storage");
      } 
      else {
          this.name = data;
      }
    })
    .catch((err) => {
      console.log("Error = " + err);
    })

    //load profile picture if stored
    this.storage.get("ProfilePic").then((data) => {
      if (data == null) 
      {
          console.log("Not in storage");
      } 
      else {
          this.base64Image = data;
      }
    })
    .catch((err) => {
      console.log("Error = " + err);
    })
  }

  ionViewDidLoad(){
    //call the load news with irish news preloaded for initial app loading
    this.loadNews("ie", "");
  }

  //===========================================

  //open the camera on mobile devices to take a profile picture, 
  //this will allow the user to crop it to a 1:1 aspect ration (Square) and then save it to the slide out menu
  openCamera(){
    const options: CameraOptions = {
      quality: 75,
      allowEdit : true,
      targetWidth: 300,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    //get the picture taken and store it as a base64 image.
    //save the image taken to storage for future loading
    this.camera.getPicture(options).then((imageData) => {

     // imageData is either a base64 encoded string or a file URI
     this.base64Image = 'data:image/jpeg;base64,' + imageData;

     this.storage.set("ProfilePic", this.base64Image);
    }, (err) => {
    });
  }
}