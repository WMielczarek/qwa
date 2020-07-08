import { Component, OnInit } from '@angular/core';
import { UserRegister } from '../model/user-register';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})



export class SignupComponent implements OnInit {

  registerUserData:UserRegister = {
    username:"",
    email:"",
    password:"",
    confirmPassword:"",
    role: ["user"]
  };

  constructor(private authService: AuthService,
              private router : Router
  ) {
  }

  ngOnInit() {
  }

  registerUser() {
    this.authService.registerNewUser(this.registerUserData).subscribe(
      res => {
        this.router.navigate(["/login"]);
      },
          err => alert(err)
    );
  }
}
