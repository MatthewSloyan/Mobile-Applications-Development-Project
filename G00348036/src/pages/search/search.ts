import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import { GetNewsProvider } from '../../providers/get-news/get-news';
import { SaveBookmarkProvider } from '../../providers/save-bookmark/save-bookmark';
import { LengthColourProvider } from '../../providers/length-colour/length-colour';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(private n: GetNewsProvider, private b: SaveBookmarkProvider,  private lc: LengthColourProvider,
    private toastCtrl: ToastController, private storage: Storage, private vibration: Vibration) {
  }

  news: any[] = [];
  countryArray: any[] = [];
  isToggled: boolean = false;
  found: boolean = false;
  foundNewsProvider: boolean = false;
  search: string;
  searchByCountry: string = "";
  newsLength: number = 20;
  colour: string = "primary";
  bookmarkLength:number = 0;

  ionViewWillEnter(){
    //load the toast popup to display instructions to the user
    this.presentToast();

    //call the lengthColour provider to load the news list length
    this.newsLength = this.lc.getNewsLength();
    
    this.storage.get("Colour").then((data) => {
        if (data == null) 
            console.log("Not in storage");
        else
            this.colour = data;
    })
    .catch((err) => {
      console.log("Error = " + err);
    })
  }

  //==================================================

  //call the method when the users clicks search
  getNews() {
    // if the value is an empty string don't filter the items
    if (this.search && this.search.trim() != '') {

      //converts the input string to lowercase
      this.search = this.search.toLowerCase();
      
      //if toggled is false then it is searching by country
      //call the provider method to get the countries api, and return it's results
      if (this.isToggled == false){
        
        this.n.getCountry().subscribe(data => 
        {
          this.countryArray = data.countries;

          //loop through the array returned (28 positions), and if the string input equals to a position in the array
          //then get the id for that country. E.g Search = "ireland", returns id="ie"
          for (let c of this.countryArray) {
            if(c.country == this.search)
            {
              this.searchByCountry = c.id;
              this.found = true;
              break;          
            }
          }

          //if found then call api using the country id.
          //I have used the same method for both country/provider search by passing different values into the string.
          if (this.found == true){
            this.loadSearchNews("country=" + this.searchByCountry, "");
          }
          else {
            //error toast message and vibrate for half a second on mobile devices
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
        //else then search by news provider, replacing spaces with a dash as the required provider id's have dashes between words.
        //e.g fox-news, bbc-news
        var source = this.search.replace(" ", "-");

        this.loadSearchNews("", "sources=" + source);
      }
    }
  }

  // =============================================

  //method which calls the news api based on either country or provider search.
  loadSearchNews(country:string, provider:string){

    this.n.getSearchData(country, provider).subscribe(data => 
    {
        try {
          this.news = data.articles;
          //this.foundNewsProvider = true;
          if (provider == ""){
            //set the lenth of the array to the length, only for country as provider search can only return 10 values
            this.news.length = this.newsLength; 
          }
        } catch (error) {
          
        } 
    
        for (let image of this.news) {
          if(image.urlToImage == null)
          {
            image.urlToImage = "https://cdn3.iconfinder.com/data/icons/communication-icons-3/512/Newspaper-512.png";          
        }
      }
    });

    //this.errorMessage(country);
  }

  //=======================================

  // async errorMessage(country: string){
  //   if (this.foundNewsProvider == false && country != ""){
  //     await this.vibration.vibrate(500);

  //     let toastError = this.toastCtrl.create({
  //       message: 'Provider not found, please try again.',
  //       duration: 4000,
  //       showCloseButton: true
  //     });
  //     await toastError.present();
  //   }
  // }

  //pass in the data from the news.html for the specific news item and call the saveBookmarks provider to add to storage.
  bookmark(image:string, url:string, title:string, description:string, source:string){

    this.bookmarkLength = this.b.saveBookmark(image, url, title, description, source);

    this.vibration.vibrate(100);
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
