import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  submitted = false;
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      userName: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },{
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registrationForm.controls; }

  register() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    this.userService.register(this.registrationForm.value).subscribe(data => {
      const user: User = data;
      this.userService.setUser(user);
      this.toastr.success('Enjoy the application!', 'Welcome!');
      this.router.navigate(['/home']);
    },
    (err) => {
      this.toastr.error(err, 'Error!');
    })
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
