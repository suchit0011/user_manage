import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userservice: UserService) { }

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(5)]),
    contact: new FormControl('', [Validators.required,Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  get name() {
    return this.loginForm.get('name');
  }

  get contact() {
    return this.loginForm.get('contact');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.userservice.userRegister(this.loginForm.value).subscribe((res: any) => {
      console.log('user register form', res);
    })
  }

  ngOnInit() {
  }

}
