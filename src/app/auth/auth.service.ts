import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface User {
  name: string;
  email: string;
  password: string;
  userType: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  signup(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }
}