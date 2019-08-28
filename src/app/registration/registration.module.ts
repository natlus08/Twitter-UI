import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//import components
import { RegistrationComponent } from './component/registration.component';

const routes: Routes = [
  { path: '', component: RegistrationComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [ RegistrationComponent ],
  providers: []
})
export class RegistrationModule { }
