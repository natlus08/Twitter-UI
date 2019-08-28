import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Constants {
  public static USER_API_ENDPOINT = 'http://localhost:8080/user';
  public static TWEET_API_ENDPOINT = 'http://localhost:8080/tweet';
  public static FRIEND_API_ENDPOINT = 'http://localhost:8080/friend';
  public static HTTP_OPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'responseType': 'text' as 'json'
    })
  };
  public static HTTP_OPTIONS_FILE = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    })
  };
}
