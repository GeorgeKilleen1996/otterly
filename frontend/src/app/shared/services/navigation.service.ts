import { Injectable } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private navigationSubject = new BehaviorSubject<boolean>(false);
  isNavigating$ = this.navigationSubject.asObservable();
  
  constructor(private router: Router) {
    // Initialize navigation events
    this.router.events.subscribe((event: Event) => {
      // Log the event type to debug
      console.log('Navigation Event:', event.constructor.name);
      
      if (event instanceof NavigationStart) {
        this.navigationSubject.next(true);
        console.log('Navigation Started - isNavigating set to true');
      }
      
      if (
        event instanceof NavigationEnd || 
        event instanceof NavigationCancel || 
        event instanceof NavigationError
      ) {
        this.navigationSubject.next(false);
        console.log('Navigation Completed - isNavigating set to false');
      }
    });
  }
}
