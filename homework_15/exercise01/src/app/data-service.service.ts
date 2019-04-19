import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const HOST_URL = "http://localhost:3000/api/";

import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';
const JWT_KEY="JWT_KEY";
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor(private http:HttpClient) { }

  checkEmailDuplicate(email){
   return timer(1000)
      .pipe(
        switchMap(() => {
            return this.http.get(`${HOST_URL}checkDuplicate/${email}`);
      })
    );
  }


    emailValidator(): AsyncValidatorFn {
      return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return this.checkEmailDuplicate(control.value)
          .pipe(
            map(res => {
              // if email is already taken
              if (!res["result"]) {
                // return error
                return { 'emailExists': true};
              }
            })
          );
      };

  }
  login(username, password){
    let login = this.http.post(`${HOST_URL}login/`,{username:username, password:password});
    login.subscribe((data)=>{
      // {
      //   "result": true,
      //   "message": "Authentication successful!",
      //   "openId": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indhbmdkb25nIiwiaWF0IjoxNTU1NjQ2ODI0LCJleHAiOjE1NTU2OTAwMjR9.F6MjdDeNhylqeCQRVmZBWuGMzrldEBn6uKaoaaTPEDc"
      //   }
      localStorage.setItem(JWT_KEY, data["openId"]);
    });
    return login;
  }
  getToken(){
    return localStorage.getItem(JWT_KEY);
  }
  getProtected(){
    return  this.http.get(`${HOST_URL}protected/`);
  }
}
