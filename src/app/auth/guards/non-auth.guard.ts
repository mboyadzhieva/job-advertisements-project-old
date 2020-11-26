import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
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
