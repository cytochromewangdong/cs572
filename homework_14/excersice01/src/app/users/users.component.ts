import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-users',
  template:`  
  <h1> This is the modle to show</h1>
  <a [routerLink]="['12345666']">A fake user, should return an error</a>
  <div class='row' *ngFor='let user of users'>
  <a [routerLink]="[user.login.uuid]">{{user.login.uuid}}</a>
  </div>
<router-outlet></router-outlet>`,
  styles: []
})
export class UsersComponent implements OnInit {

  users:Array<any>;
  constructor(private dataService:DataServiceService) { }

  ngOnInit() {
    this.dataService.getCachedData().subscribe(data=>{
      this.users = data.results;
    });
  }

}
