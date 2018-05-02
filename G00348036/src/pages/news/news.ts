import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { GetNewsProvider } from '../../providers/get-news/get-news';
import { SaveBookmarkProvider } from '../../providers/save-bookmark/save-bookmark';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  constructor(private platform: Platform, private geolocation: Geolocation, private androidPermissions: AndroidPermissions, 
    private n: GetNewsProvider, private b: SaveBookmarkProvider, private storage: Storage, 
    private toastCtrl: ToastController, private vibration: Vibration) {
  }

  weatherData: any[] = [];
  news: any[] = [];
  newsLength: number = 20;
  country: string;
  weatherIcon: string;
  weatherIconURL: string = "http://openweathermap.org/img/w/01d.png";
  temperature: number = 0;
  colour: string = "primary";
  lat:number;
  long:number;
  bookmarkLength:number = 0;

  ionViewDidLoad() {
    //get location for desktop use. Else ask for location permissions on android devices
    if (this.platform.is('core')) {
      this.getLocation();
    }
    else {
       this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
         result => this.getLocation(), //success
         err => this.presentToast() //failure, so present error toast message
       );
    }
  }

  ionViewWillEnter(){
    //I tried to get the provider working with both colour and news length and it did, but it didn't load fast enough 
    //when loading the page so it always needed a refresh whereas it works seamlessly this way
    this.storage.get("NewsLength").then((data) => {
      if (data == null) {
          console.log("Not in storage");
      } 
      else {
          this.newsLength = data;
      }
    })
      .catch((err) => {
      console.log("Error = " + err);
    })

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

  //=========================================

  //get the users coordinates using the Geolocation plugin
  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
    this.lat = resp.coords.latitude;
    this.long = resp.coords.longitude;

    //call the get weather method which calls the weather api
    this.getWeatherData();
    }).catch((error) => {
      this.presentToast();
      console.log('Error getting location', error);
    });
  }

  //using the users coordinates get weather data based on their location.
  getWeatherData(){
    this.n.GetWeather(this.lat, this.long).subscribe(data => 
      {
        this.weatherData = data; //set the returned data promise to the array
        this.country = data.sys.country; //get the country code from the data to be used to get local news.
        this.country = this.country.toLowerCase();
        this.weatherIconURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"; //set the icon url using the returned data.
        this.temperature = data.main.temp - 273.15; //calculate the temperature in celsius

        //get the local news using the country saved above.
        this.getCountryNews();
      });
  }

  getCountryNews(){
    //get the news data based on the location retrieved
    this.n.getNewsData(this.country, "").subscribe(data => 
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

  //=========================================

  //pass in the data from the news.html for the specific news item and call the saveBookmarks provider to add to storage.
  bookmark(image:string, url:string, title:string, description:string, source:string){

    this.bookmarkLength = this.b.saveBookmark(image, url, title, description, source);

    this.vibration.vibrate(100);
  }

  //=========================================

   presentToast() {
    this.vibration.vibrate(500);

    let toast = this.toastCtrl.create({
      message: 'Unable to access location, please try again.',
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }
}

