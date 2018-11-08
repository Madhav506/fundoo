import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(public auth: AuthguardService, public router: Router) {}
  // to manage the navigation and activates the routes
  canActivate(
    /**Contains the information about a route associated with a component loaded in an outlet at a particular moment in time. */
    next: ActivatedRouteSnapshot,
    /**Represents the state of the router at a moment in time. */
    /** observer subscribes to an Observable, observer reacts to whatever item or sequence of items the Observable emits. */
    /**Represents the completion of an asynchronous operation */
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    
    return true;
  }

  

  
}