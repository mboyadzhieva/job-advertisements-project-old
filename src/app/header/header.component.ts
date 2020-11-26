import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged: boolean;
  loggedUser: User;
  userRole: string;

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getIsLogged().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (isLogged) => {
       this.isLogged = isLogged;

       if (this.isLogged){
        this.loggedUser = this.authService.getLoggedUser();
        this.userRole = this.loggedUser.role;
        }
      });
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogout(): void{
    this.authService.logout();

    this.router.navigate(['login']);
  }

}
