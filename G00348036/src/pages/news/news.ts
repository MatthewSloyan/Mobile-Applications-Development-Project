import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { GetNewsProvider } from '../../providers/get-news/get-news'
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  constructor(private platform: Platform, public navCtrl: NavController, public navParams: NavParams, 
    private geolocation: Geolocation, private androidPermissions: AndroidPermissions, private n: GetNewsProvider, public storage: Storage) {

  }

  weatherData: any[] = [];
  news: any[] = [];
  newsLength: number = 20;
  country: string;
  lat:number;
  long:number;
  value2:number;
  value3:number;

  ionViewDidLoad() {

    this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;

        this.n.GetWeather(this.lat, this.long).subscribe(data => 
        {
          this.weatherData = data;
          this.country = data.sys.country;
          this.country = this.country.toLowerCase();

          this.getCountryNews();
          console.log(this.weatherData);
          console.log(this.country);
        });
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    //get the news length from storage
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

  getCountryNews(){
    //get the news data based on the location retrieved
    this.n.getNewsData(this.country, "").subscribe(data => 
    {
      this.news = data.articles;
      this.news.length = this.newsLength;

      for (let image of this.news) {
        if(image.urlToImage == null)
        {
          image.urlToImage = "https://cdn3.iconfinder.com/data/icons/communication-icons-3/512/Newspaper-512.png";          
        }
      }
      console.log(this.news);
    });
  }

}
