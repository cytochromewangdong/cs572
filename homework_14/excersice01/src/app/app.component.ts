import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="row">
        <ul>
        <li><a [routerLink]="['']">Home</a></li>
        <li><a [routerLink]="['users']">Users</a></li>
        </ul>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  // data:any;
  ngOnInit(): void {
    // this.dataService.getOnlineData().subscribe(data=>this.data = data, err=>{
    //   this.data =err;
    // }, ()=>console.log("finished!!!f"));
    // ;
  }
  title = 'excersice01';
  constructor(private dataService:DataServiceService){
    
  }
}
