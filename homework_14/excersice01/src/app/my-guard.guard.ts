import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataServiceService } from './data-service.service';


@Injectable()
export class MyGuardGuard implements CanActivate  {
  constructor(private dataService:DataServiceService,private router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
       let uuid = route.paramMap.get("uuid");
       if(uuid)
       {
        return new Promise((resolve,reject)=>{
       
          this.dataService.getCachedData().subscribe(data=>{
            let found =  data.results.filter(user=> user.login.uuid===uuid);
             if(found.length>0){
               console.log("I returned!")
               resolve(true);
             } else {
               this.router.navigate(['/404']);
               resolve(false);
             }
          })
        })
 
          
       }
       return true;
  }
  
}
