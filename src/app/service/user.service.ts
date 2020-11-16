import { User } from './../../models/user.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public authenticate(login) {
    return this.http.post(this.apiUrl+"/authenticate", login)
  }
  
  logOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }

  isUserAuthenticated() {
    return sessionStorage.getItem("username") != null && sessionStorage.getItem("token") != null;
  }

  public getLoggedInUserId() {
    return this.http.get(this.apiUrl+"/user/getLoggedInUser");
  }
}
