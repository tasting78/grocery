import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private backendUrl = `${environment.backendUrl}/api/signup`; // Use environment variable

  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post(this.backendUrl, data);
  }
}
