import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-home',
  template: '<router-outlet></router-outlet>'
})
export class HomeComponent implements OnInit {

  activeUser: User = null;

  constructor(private userService: UserService, private router: Router) {
    this.activeUser = this.userService.getUser();
    if (!this.activeUser) {
      //this.router.navigate(['/login']);
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
