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
      'https://localhost:7118/api/users/update/' + id,
      data,
      this.requestOptions
    );
  }

  updateImage(id: any, data: any) {
    return this.myHttpClient.put(
      'https://localhost:7118/api/users/image/' + id,
      data
    );
  }
}
