import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetNewsProvider } from '../../providers/get-news/get-news'
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private n: GetNewsProvider, public toastCtrl: ToastController, public storage: Storage) {
  }

  news: any[] = [];
  isToggled: boolean = false;
  search: string;
  searchByCountry: string;
  newsLength: number = 20;

  ionViewDidLoad() {
    this.presentToast();
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

  getNews(ev: any) {
    // if the value is an empty string don't filter the items
    if (this.search && this.search.trim() != '') {

      if (this.isToggled == false){
        //by country
        this.searchByCountry = this.search.substring(0,2);

        this.loadSearchNews("country=" + this.searchByCountry, "");
      }
      else {
        //by provider
        var source = this.search.replace(" ", "-"); 
        console.log(source);

        this.loadSearchNews("", "sources=" + source);
      }
    }
  }

  loadSearchNews(country:string, provider:string){
    this.n.getSearchData(country, provider).subscribe(data => 
    {
        let count:number = 0;

        try {
          this.news = data.articles;
          this.news.length = this.newsLength;
        } catch (error) {
          
        } 

        for (let n of this.news) {
          if(this.news[count].urlToImage == null)
          {
            this.news[count].urlToImage = "https://cdn3.iconfinder.com/data/icons/communication-icons-3/512/Newspaper-512.png";          
          }
          count++;
        }
        
        console.log(this.news);

        if (this.news.length == 0){
         let toastError = this.toastCtrl.create({
           message: 'Not found, please try again.',
           duration: 4000,
           showCloseButton: true
         });
         toastError.present();
        }
     });
   }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Search for either a country or news provider (E.g Ireland, BBC News)',
      duration: 6000,
      showCloseButton: true
    });
    toast.present();
  }
}
