import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Constants } from '../constants/constants';
import { Tweet } from '../model/tweet.model';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private http:HttpClient) { }

  tweet(tweet:Tweet):Observable<Tweet>{
    let formData: FormData = new FormData();
    if (tweet.image) {
      formData.append('image', tweet.image);
    }
    if (tweet.text) {
      formData.append('text', tweet.text);
    }
    formData.append('owner', tweet.owner);
    return this.http.post<Tweet>(Constants.TWEET_API_ENDPOINT, formData);
  }

  tweetImage(image:File, id:number):Observable<Tweet>{
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    return this.http.post<Tweet>(Constants.TWEET_API_ENDPOINT+'/image/', formData);
  }

  delete(id:number):Observable<any>{
    return this.http.delete(Constants.TWEET_API_ENDPOINT+'/'+id);
  }

  tweets(userName:string):Observable<Tweet[]>{
    return this.http.get<Tweet[]>(Constants.TWEET_API_ENDPOINT + '/' + userName);
  }

  friendsTweets(userName:string):Observable<Tweet[]>{
    return this.http.get<Tweet[]>(Constants.TWEET_API_ENDPOINT + '/friends/' + userName);
  }
}
