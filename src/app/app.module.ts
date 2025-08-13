import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SignupService } from './services/signup.service'; // New import

@NgModule({
  declarations: [
    // ...existing code...
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // ...existing code...
  ],
  providers: [SignupService], // Add SignupService here
  bootstrap: [/* ...existing code... */]
})
export class AppModule { }