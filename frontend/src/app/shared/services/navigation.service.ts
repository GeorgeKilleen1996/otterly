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
    this.initializeNavigationEvents();
  }
  
  private initializeNavigationEvents() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.navigationSubject.next(true);
      }
      
      if (event instanceof NavigationEnd || 
          event instanceof NavigationCancel || 
          event instanceof NavigationError) {
        this.navigationSubject.next(false);
      }
    });
  }
  
  // Helper method to get current route data
  getCurrentRouteData() {
    const currentRoute = this.router.routerState.snapshot.root;
    return currentRoute.firstChild?.data;
  }
}
