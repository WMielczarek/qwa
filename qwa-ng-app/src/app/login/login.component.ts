import { Component, OnInit } from '@angular/core';
import {UserLogin} from "../model/user-login";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../service/token-storage.service";
import {tokenKey} from "@angular/core/src/view";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  roles: string[] = [];

  loginUserData : UserLogin = {
    username: "",
    password: ""
  };

  constructor(private authService: AuthService, private router:Router, private tokenStorage:TokenStorageService) { }

  ngOnInit() {
  }


  loginUser() {
    this.authService.loginUser(this.loginUserData).subscribe(
      res => {
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUsername(res.username);
        this.tokenStorage.saveAuthorities(res.authorities);
        this.roles = this.tokenStorage.getAuthorities();
        console.log(this.tokenStorage.getToken()+this.tokenStorage.getAuthorities()+this.tokenStorage.getUsername());
        this.router.navigate(['/categories'])},
      err => alert("Niepoprawne dane, spróbuj ponownie")
    )
  }
}
