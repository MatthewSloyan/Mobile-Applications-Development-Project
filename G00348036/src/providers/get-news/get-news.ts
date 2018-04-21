import { HttpClient } from '@angular/common/http';
//import { Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class GetNewsProvider {
  //headers = new Headers({'user-key': '23310354414ca6645cc484dc68ccd554'});
  //options = new RequestOptions({headers : this.headers});

  constructor(public http: HttpClient) {
    console.log('Hello GetNewsProvider Provider');
  }

  // getNewsData(): Observable<any>{
  //   return this.http.get("/api/v2/top-headlines?country=ie&category=business&apiKey=4a2f85ba571e4c85b13f94d86d9c45ad");
  // } 

  getNewsData(country:string, category:string): Observable<any>{
    return this.http.get("/api/v2/top-headlines?country=" + country + category + "&apiKey=4a2f85ba571e4c85b13f94d86d9c45ad");
  } 

  getSearchData(country:string, provider:string): Observable<any>{
    return this.http.get("/api/v2/top-headlines?" + country + provider + "&apiKey=4a2f85ba571e4c85b13f94d86d9c45ad");
  } 

  getCountry(): Observable<any>{
    return this.http.get("https://www.jsonblob.com/api/dc6569c3-3fee-11e8-a8a1-f1dce52bb44b");
  } 

  GetWeather(lat:number, long:number):Observable<any>{
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=6a66416403ed8e5e6e762cb8c261f303");
  }
}
