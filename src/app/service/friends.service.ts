import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Constants } from '../constants/constants';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http:HttpClient) { }

  friends(userName: string):Observable<User[]>{
    return this.http.get<User[]>(Constants.FRIEND_API_ENDPOINT + '/' + userName);
  }

  befriend(userName: string, friendName: string):Observable<User>{
    return this.http.get<User>(Constants.FRIEND_API_ENDPOINT + '/' + userName + '/befriend/' + friendName);
  }

  unfriend(userName: string, friendName: string):Observable<User>{
    return this.http.get<User>(Constants.FRIEND_API_ENDPOINT + '/' + userName + '/unfriend/' + friendName);
  }

  search(query: string): Observable<User[]> {
    return this.http.get<User[]>(Constants.FRIEND_API_ENDPOINT + '/search/' + query);
  }
}
