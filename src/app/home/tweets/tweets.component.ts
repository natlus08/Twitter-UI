import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User } from '../../model/user.model';
import { Tweet } from '../../model/tweet.model';
import { TweetService } from '../../service/tweet.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css', '../home.component.css']
})
export class TweetsComponent implements OnInit {
  activeUser: User;
  tweets: Tweet[] = [];
  tweet: Tweet = null;
  postpic = false;
  posttext = false;


  constructor(private tweetService: TweetService, private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.activeUser = this.userService.getUser();
    this.tweet = new Tweet(this.activeUser.userName);
    this.tweetService.tweets(this.activeUser.userName).subscribe(data => {
        this.tweets = data;
      },
      (err) => {
        this.toastr.error(err, 'Error!');
      }
    );
  }

  switchForm(form: string) {
    if (form === 'pic') {
      this.postpic = true;
      this.posttext = false;
      this.tweet.text=null;
      this.tweet.image=null;
    } else {
      this.postpic = false;
      this.posttext = true;
      this.tweet.text=null;
      this.tweet.image=null;
    }
  }

  addTweet() {
    if (this.tweet.image === null && this.tweet.text === null) {
      this.toastr.info('Say something!');
      return;
    }
    this.tweetService.tweet(this.tweet).subscribe((data) => {
        const newTweet: Tweet = data;
        this.tweets.push(newTweet);
        this.toastr.success('Tweeted!');
        this.tweet = new Tweet(this.activeUser.userName);
    },
    (err) => {
      this.toastr.error(err, 'Error!');
    });
  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.tweet.image = event.target.files[0];
    }
  }

  deleteTweet(tweet: Tweet) {
    this.tweetService.delete(tweet.id).subscribe(data => {
        this.tweets = this.tweets.filter(tweets => {
          return tweets.id !== tweet.id;
        });
        this.toastr.warning('Removed.')
    },
    err => {
      this.toastr.error(err, 'Error!');
    })
  }
}
