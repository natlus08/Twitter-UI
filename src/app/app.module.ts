import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalConfig, ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { mainrouting } from './router/main-routing';
import { LoginComponent } from './login/login.component';
import { UserService } from './service/user.service';
import { FriendsService } from './service/friends.service';
import { TweetService } from './service/tweet.service';
import { TwitterHttpInterceptor } from './service/twitter-http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    mainrouting,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
        autoDismiss: false,
        closeButton: true,
        maxOpened: 0,
        newestOnTop: true,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        tapToDismiss: true
      } as Partial<GlobalConfig>)
  ],
  providers: [
    UserService,
    FriendsService,
    TweetService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TwitterHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

