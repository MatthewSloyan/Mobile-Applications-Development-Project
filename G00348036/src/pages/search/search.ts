import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetNewsProvider } from '../../providers/get-news/get-news'
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private n: GetNewsProvider, public toastCtrl: ToastController) {
  }

  news: any[] = [];
  isToggled: boolean = false;
  search: string;
  searchByCountry: string;

  ionViewDidLoad() {
    this.presentToast();
  }

  getNews(ev: any) {
    // set val to the value of the searchbar
    //let val = ev.target.value;

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
       this.news = data.articles;

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
