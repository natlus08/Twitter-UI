import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Constants } from '../constants/constants';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  activeUser: User = new User(1, "java", [], "java");

  setUser(user: User) {
    this.activeUser = user;
  }

  getUser(): User {
    return this.activeUser;
  }

  logout() {
    this.activeUser = null;
  }

  register(user:User):Observable<User>{
    let body = JSON.stringify(user);
    return this.http.post<User>(Constants.USER_API_ENDPOINT, user);
  }

  login(user:User):Observable<User>{
    let body = JSON.stringify(user);
    return this.http.post<User>(Constants.USER_API_ENDPOINT+'/login', user);
  }

  deleteProfile(id:number):Observable<any>{
    return this.http.delete(Constants.USER_API_ENDPOINT+'/'+id);
  }

  addAvatar(avatar:any, username: string):Observable<User>{
    if (avatar) {
      let formData: FormData = new FormData();
      formData.append('image', avatar);
      return this.http.post<User>(Constants.USER_API_ENDPOINT + '/' + username, formData);
    }
  }
}
