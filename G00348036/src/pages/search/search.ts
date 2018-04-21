import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetNewsProvider } from '../../providers/get-news/get-news'
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private n: GetNewsProvider, 
    public toastCtrl: ToastController, public storage: Storage, private vibration: Vibration) {
  }

  news: any[] = [];
  countryArray: any[] = [];
  isToggled: boolean = false;
  found: boolean = false;
  search: string;
  searchByCountry: string = "";
  newsLength: number = 20;
  colour: string = "primary";
  bookmarkLength:number = 0;

  ionViewDidLoad() {
    this.presentToast();

    this.storage.get("Colour").then((data) => {
      if (data == null) 
      {
          console.log("Not in storage");
      } 
      else {
          this.colour = data;
      }
    })
      .catch((err) => {
      console.log("Error = " + err);
    })
  }

  ionViewWillEnter() {
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
  }

  //==================================================

  getNews() {
    // if the value is an empty string don't filter the items
    if (this.search && this.search.trim() != '') {

      this.search = this.search.toLowerCase();
      
      if (this.isToggled == false){
        //by country

        this.n.getCountry().subscribe(data => 
        {
          this.countryArray = data.countries;
          console.log(this.countryArray);

          for (let c of this.countryArray) {
            if(c.country == this.search)
            {
              this.searchByCountry = c.id;
              this.found = true;
              console.log(c.id);
              break;          
            }
          }

          if (this.found == true){
            this.loadSearchNews("country=" + this.searchByCountry, "");
          }
          else {
            this.vibration.vibrate(500);

            let toastError = this.toastCtrl.create({
              message: 'Country not found, please try again.',
              duration: 4000,
              showCloseButton: true
            });
              toastError.present();
            }
        });
      }
      else {
        //by provider
        var source = this.search.replace(" ", "-");
        console.log(source);

        this.loadSearchNews("", "sources=" + source);
      }
    }
  }

  // =============================================

  loadSearchNews(country:string, provider:string){
    this.n.getSearchData(country, provider).subscribe(data => 
    {
        try {
          this.news = data.articles;
          //this.news.length = this.newsLength;
        } catch (error) {
          
        } 

        //console.log(this.news);

        //  if (this.news == null){
        //     let toastError = this.toastCtrl.create({
        //       message: 'Provider not found, please try again.',
        //       duration: 4000,
        //       showCloseButton: true
        //     });
        //       toastError.present();
        //  }

        //console.log(" thanks " + data.status);
    
        for (let image of this.news) {
          if(image.urlToImage == null)
          {
            image.urlToImage = "https://cdn3.iconfinder.com/data/icons/communication-icons-3/512/Newspaper-512.png";          
        }
      }
    });
   }

  //=======================================

  bookmark(image:string, url:string, title:string, description:string, source:string){

    this.storage.get("BookmarkLength").then((data) => {
      if (data == null) 
      {
          console.log("Not in storage");

          this.countBookmarkItems();
      } 
      else {
          this.bookmarkLength = data;
          console.log(this.bookmarkLength);

          this.countBookmarkItems();
      }

        this.storage.set("b" + this.bookmarkLength, {"Image": image, "Url": url, "Title": title, "Description": description, "Source":source });
        console.log("Bookmark length home" + this.bookmarkLength);
      
    })
  }

  countBookmarkItems() {
    this.storage.set("BookmarkLength", this.bookmarkLength + 1);
    console.log(this.bookmarkLength);
  } 

  //=========================================

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Search for either a country or news provider (E.g Ireland, BBC News)',
      duration: 6000,
      showCloseButton: true
    });
    toast.present();
  }
}
