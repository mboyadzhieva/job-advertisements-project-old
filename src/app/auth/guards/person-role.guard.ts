import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})
export class PersonRoleGuard implements CanActivate {
    constructor(private authService: AuthService){}

    canActivate(): boolean{
        const user = this.authService.getLoggedUser();

        if (user && user.role === 'person'){
            return true;
        }

        return false;
    }
}
