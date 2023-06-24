import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private myHttpClient: HttpClient) {}

  token = localStorage.getItem('token');

  headers = new HttpHeaders({
    Authorization: `${this.token}`,
  });

  requestOptions = { headers: this.headers };

  updateInfo(id: any, data: any) {
    return this.myHttpClient.put(
      'https://craftsapp.azurewebsites.net/api/users/update/' + id,
      data,
      this.requestOptions
    );
  }

  updateImage(id: any, data: any) {
    return this.myHttpClient.put(
      'https://craftsapp.azurewebsites.net/api/users/image/' + id,
      data
    );
  }
}
