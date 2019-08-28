import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User } from '../../model/user.model';
import { Tweet } from '../../model/tweet.model';
import { TweetService } from '../../service/tweet.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css', '../home.component.css']
})
export class WallComponent implements OnInit {

  activeUser: User;
  tweets: Tweet[] = [];

  constructor(private tweetService: TweetService, private userService: UserService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.activeUser = this.userService.getUser();
    this.tweetService.friendsTweets(this.activeUser.userName).subscribe(data => {
        this.tweets = data;
      },
      (err) => {
        this.toastr.error(err, 'Error!');
      }
    );
  }

}
