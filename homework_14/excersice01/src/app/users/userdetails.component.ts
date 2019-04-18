import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  template:`
  <ul>
    <li><a [routerLink]="['/users']">back to Users</a></li>
  </ul>
  <pre>
  {{user|json}}
  </pre>
  `,
  styles: []
})
export class UserdetailsComponent implements OnInit {

  user:any;
  constructor(private dataService:DataServiceService, private route:ActivatedRoute) {
    this.route.params.subscribe(param=>{
      console.log(param);
      dataService.getCachedData().subscribe(data=>{
          let found =  data.results.filter(user=> user.login.uuid===param.uuid);
          this.user = found[0];
      })
    });
   }

  ngOnInit() {
   }

}
