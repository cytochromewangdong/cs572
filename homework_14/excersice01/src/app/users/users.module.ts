import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserdetailsComponent } from './userdetails.component';
import { MyGuardGuard } from '../my-guard.guard';
// import { UsersComponent } from './users.component';
// import { UserdetailsComponent } from './userdetails.component';
const MY_ROUTES:Routes = [
  {path:'', component:UsersComponent},
  {path:':uuid',component:UserdetailsComponent,canActivate: [MyGuardGuard]}
]
@NgModule({
  declarations: [UsersComponent,UserdetailsComponent],//[UsersComponent, UserdetailsComponent],
  imports: [
    CommonModule, RouterModule.forChild(MY_ROUTES)
  ], providers:[MyGuardGuard], bootstrap: [UsersComponent]
})
export class UsersModule { }
