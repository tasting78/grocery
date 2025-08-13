import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiStatusService {
  constructor(private http: HttpClient) {}

  checkApiConnection(): Observable<any> {
    return this.http.get('/api/health-check');
  }
}
