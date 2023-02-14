import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LoggingService {
  logStatusChange(status: string) {
    console.log('A service status changed, new status: ' + status);
  }
}
