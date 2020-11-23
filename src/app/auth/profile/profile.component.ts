import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {  take, takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  errorMsg: string;
  isLogged: boolean;
  loggedUser: User;
  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (params) => {
        const id = params.id;
        if (id){
          this.getUser(id);
        }
      });
  }

  onSubmit(): void{
    this.loggedUser.name = this.formGroup.value.name;
    this.loggedUser.password = this.formGroup.value.password;

    this.authService.updateUser(this.loggedUser).pipe(
      take(1)
    ).subscribe(
      () => {
        this.router.navigate(['job-ads']);
      },
      (error) => {
        console.log(this.loggedUser);
      }
    );
  }

  onUserDelete(): void{
    this.loggedUser.isActive = false;

    this.authService.updateUser(this.loggedUser).pipe(
      take(1)
    ).subscribe(
      () => {
        this.router.navigate(['login']);
      },
      (error) => {
        console.log('delete User response failed: ' + error);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getUser(id: number): void{
    this.authService.getUserById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        console.log('response' + response);
        this.loggedUser = response;
        this.buildForm();
      },
      (error) => {
        console.log(error);
      });
    }

  private buildForm(): void{
    this.formGroup = this.fb.group({
      name: [this.loggedUser.name, [Validators.required]],
      password: [this.loggedUser.password, [Validators.required, Validators.minLength(6)]]
    });
  }

}
