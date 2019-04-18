import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomePageComponent } from './home-page/home-page.component';

const MY_ROUTES:Routes= [
    {path:'', component:HomePageComponent},
     {path:'users', loadChildren:"./users/users.module#UsersModule"},
     {path: '**', component: PageNotFoundComponent}
];
export const myroutes = RouterModule.forRoot(MY_ROUTES,{preloadingStrategy: PreloadAllModules});