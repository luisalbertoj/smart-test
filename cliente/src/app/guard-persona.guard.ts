import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FactoryService } from './services/factory.service';

@Injectable({
  providedIn: 'root'
})
export class GuardPersonaGuard implements CanActivate {
  constructor(private router:Router,
    private factory: FactoryService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.factory.user?.id) {
      return true;
    }
    this.router.navigate(['auth']);
  }
  
}
