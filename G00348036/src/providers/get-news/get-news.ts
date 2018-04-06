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

  getNewsData(): Observable<any>{
    return this.http.get("/api/v2/top-headlines?country=us&apiKey=4a2f85ba571e4c85b13f94d86d9c45ad");
  } 
}
