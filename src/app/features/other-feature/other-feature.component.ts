import { Component, OnInit } from '@angular/core';
import { ApiStatusService } from 'src/app/services/api-status.service';

@Component({
  selector: 'app-other-feature',
  templateUrl: './other-feature.component.html',
  styleUrls: ['./other-feature.component.css']
})
export class OtherFeatureComponent implements OnInit {
  apiStatus: string | null = null;

  constructor(private apiStatusService: ApiStatusService) {}

  ngOnInit(): void {
    this.checkApiConnection();
  }

  checkApiConnection(): void {
    this.apiStatusService.checkApiConnection().subscribe({
      next: () => {
        this.apiStatus = 'API is connected.';
      },
      error: () => {
        this.apiStatus = 'Failed to connect to the API.';
      }
    });
  }
}
