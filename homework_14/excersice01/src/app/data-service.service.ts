import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient) { }
  private KEY_NAME = "DataServiceService";
  getOnlineData(){
    let dataGet = this.http.get("https://randomuser.me/api/?results=10");

    dataGet.subscribe(data=>{
      window.localStorage.setItem(this.KEY_NAME, JSON.stringify(data));
    });
    return dataGet;
  }
  getCachedData(){
    return Observable.create(obs=>{
      let dataGet = JSON.parse(window.localStorage.getItem(this.KEY_NAME));
      obs.next(dataGet);
    });
  }
}
