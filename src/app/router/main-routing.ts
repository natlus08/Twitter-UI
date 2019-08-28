import { NgModule } from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';

const mainRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    // since this is the default route, it must NOT be lazy loaded.
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    loadChildren: '../registration/registration.module#RegistrationModule'
  },
  {
    path: 'home',
    loadChildren: '../home/home.module#HomeModule'
  }
];

const routeConfig = {
  //useHash: true,
  preloadingStrategy: NoPreloading
};

@NgModule({
  imports: [RouterModule.forRoot(mainRoutes, routeConfig)],
  exports: [RouterModule]
})
export class mainrouting {
}
