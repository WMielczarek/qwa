import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {UserRegister} from "../model/user-register";
import {Observable} from "rxjs";
import {UserLogin} from "../model/user-login";
import {JwtResponse} from "../model/jwt-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = "http://localhost:8080/api";
  private REGISTER_USER_URL = `${this.BASE_URL}/auth/signup`;
  private LOGIN_USER_URL = `${this.BASE_URL}/auth/signin`;

  constructor(private http: HttpClient) { }


  registerNewUser(newUser : UserRegister): Observable<string> {
    return this.http.post<string>(this.REGISTER_USER_URL, newUser);
  }

  loginUser(userData : UserLogin): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.LOGIN_USER_URL, userData);
  }

}
