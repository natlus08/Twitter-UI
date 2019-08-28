import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';

import { User } from '../../model/user.model';
import { Tweet } from '../../model/tweet.model';
import { TweetService } from '../../service/tweet.service';
import { UserService } from '../../service/user.service';
import { FriendsService } from '../../service/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css', '../home.component.css']
})
export class FriendsComponent implements OnInit {

  activeUser: User;
  friends: User[] = [];
  suggestedFriends: User[] = [];

  @ViewChild('queryField') queryField: ElementRef;

  constructor(private userService: UserService, private toastr: ToastrService,
              private friendsService: FriendsService) { }

  ngOnInit() {
    this.activeUser = this.userService.getUser();
    this.getFriends();
    fromEvent(this.queryField.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      ,filter(res => res.length > 2)
      ,debounceTime(1000)
      ,distinctUntilChanged()
    ).subscribe((text: string) => {
        this.friendsService.search(text).subscribe((res)=>{
          this.suggestedFriends = res;
        },
        (err) => {
          this.toastr.error(err, 'Error!');
        });
    });
  }

  getFriends() {
    this.friendsService.friends(this.activeUser.userName).subscribe(data => {
        this.friends = data;
      },
      (err) => {
        this.toastr.error(err, 'Error!');
      }
    );
  }

  unfriend(friendName: string) {
    this.friendsService.unfriend(this.activeUser.userName, friendName).subscribe(data => {
        this.userService.setUser(data);
        this.getFriends();
    },
    (err) => {
      this.toastr.error(err, 'Error!');
    })
  }

  befriend(friendName: string) {
    if (this.activeUser.userName === friendName) {
      return;
    }
    this.friendsService.befriend(this.activeUser.userName, friendName).subscribe(data => {
        this.userService.setUser(data);
        this.getFriends();
      },
      (err) => {
        this.toastr.error(err, 'Error!');
      })
  }

}
