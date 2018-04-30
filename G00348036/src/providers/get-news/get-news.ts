import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class GetNewsProvider {

  constructor(public http: HttpClient) {
  }

  //call the news api to return based on country and category for the home page
  //The call starts with /api as I had to proxy the url to get it working with ionic serve, 
  //this proxy was set up in the ionic.config.json file and is used only for the two newsApi methods below.
  //I have used these methods multiple times throughout with different parameters to save code. 
  getNewsData(country:string, category:string): Observable<any>{
    return this.http.get("/api/v2/top-headlines?country=" + country + category + "&apiKey=4a2f85ba571e4c85b13f94d86d9c45ad");
  } 

  //call the news api to return based on country and news provider for the search page
  getSearchData(country:string, provider:string): Observable<any>{
    return this.http.get("/api/v2/top-headlines?" + country + provider + "&apiKey=4a2f85ba571e4c85b13f94d86d9c45ad");
  } 

  //call the preloaded countries api I created to return the list of countries/id's to use on the search page
  getCountry(): Observable<any>{
    return this.http.get("https://www.jsonblob.com/api/dc6569c3-3fee-11e8-a8a1-f1dce52bb44b");
  } 

  //call the weather api to return weather based on the users location
  GetWeather(lat:number, long:number):Observable<any>{
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=6a66416403ed8e5e6e762cb8c261f303");
  }
}
