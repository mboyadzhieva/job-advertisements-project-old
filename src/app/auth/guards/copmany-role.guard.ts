import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Injectable({
    providedIn: 'root'
})
export class CompanyRoleGuard implements CanActivate{

    constructor(private authService: AuthService){}

    canActivate(): boolean {
        const user = this.authService.getLoggedUser();

        if (user && user.role === 'company'){
            return true;
        }

        return false;
    }

}
