import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../home.component.css']
})
export class NavbarComponent implements OnInit {

  activeUser: User = null;
  addavatar = false;

  @Input() parent: string;

  constructor(private userService: UserService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.activeUser = this.userService.getUser();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  deleteProfile() {
    this.userService.deleteProfile(this.activeUser.id).subscribe(data => {
      this.router.navigate(['/login']);
    },
    (err) => {
      this.toastr.error(err, 'Error!');
    })
  }

  addAvatar() {
    this.addavatar = true;
  }

  onFileChange(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.userService.addAvatar(event.target.files[0], this.activeUser.userName).subscribe(data => {
          this.activeUser = data;
          this.userService.setUser(this.activeUser);
          this.addavatar = false;
      },
      (err) => {
          this.toastr.error(err, 'Error!');
      });
    }
  }

}
