import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//import components
import { HomeComponent } from './home.component';
import { TweetsComponent } from './tweets/tweets.component';
import { FriendsComponent } from './friends/friends.component';
import { WallComponent } from './wall/wall.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'friends', component: FriendsComponent },
      { path: 'tweets', component: TweetsComponent },
      { path: '', component: WallComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent,
    TweetsComponent,
    FriendsComponent,
    WallComponent,
    NavbarComponent
  ],
  providers: []
})
export class HomeModule { }
