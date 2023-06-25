import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated = false;
  constructor(private router: Router, private myHttpClient: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    this.isAuthenticated = true;
    return this.myHttpClient.post(
      'https://craftsapp.azurewebsites.net/api/admins/loginadmin',
      // 'https://localhost:7118/api/admins/loginadmin',
      obj
    );
  }

  logOut() {
    this.isAuthenticated = false;
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('image');
    localStorage.removeItem('id');
    localStorage.removeItem('loading');
    localStorage.removeItem('product1');
    localStorage.removeItem('product2');
    localStorage.removeItem('product3');
    localStorage.removeItem(
      'amplitude_unsent_identify_6e403e775d1f5921fdc52daf8f866c66'
    );
    localStorage.removeItem(
      'amplitude_unsent_6e403e775d1f5921fdc52daf8f866c66'
    );
    this.router.navigate(['']);
  }

  checkLoginStatus() {
    return localStorage.getItem('token');
  }
}
