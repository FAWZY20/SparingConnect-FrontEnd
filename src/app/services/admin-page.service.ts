import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminPage {

  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = localStorage.getItem('userAuth');
    
    if (isAuthenticated) {
      return true; 
    } else {
      return this.router.createUrlTree(['/connexion']);
    }
  }

}

@Injectable({
  providedIn: 'root'
})

export class AdminPageBloqued {

  constructor(private router: Router) { }
  
 canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = localStorage.getItem('userAuth');
    
    if (!isAuthenticated) {
      return true; 
    } else {
      return this.router.createUrlTree(['/admin']);
    }
  }

}