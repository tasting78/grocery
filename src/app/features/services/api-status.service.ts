import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiStatusService {
  private apiUrl = 'https://api.example.com';

  constructor(private http: HttpClient) {}

  checkApiConnection(): Observable<{ status: string }> {
    return this.http.get<{ status: string }>(`${this.apiUrl}/status`);
  }
}