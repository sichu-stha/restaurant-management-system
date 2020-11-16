import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllMenus() {
    return this.http.get(this.apiUrl+"/item/getAllItems");
  }
}
