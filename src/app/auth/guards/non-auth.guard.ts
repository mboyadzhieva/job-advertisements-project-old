import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanActivate{

    constructor(private router: Router, private authService: AuthService){

    }

    canActivate(): boolean {
        const user = this.authService.getLoggedUser();

        if (user){
            this.router.navigate(['/job-ads']);

            return false;
        }

        return true;
    }

}
