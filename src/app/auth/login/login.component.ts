import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  errorMsg: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void{
    this.errorMsg = null;

    const email = this.formGroup.value.email;
    const password = this.formGroup.value.password;

    this.authService.login(email, password).pipe(
      take(1)
    ).subscribe(
      (response) => {
        if (!response){
          this.errorMsg = 'Invalid email and/or password!';
          return;
        }

        this.router.navigate(['/job-ads']);
      }
    );
  }

  private buildForm(): void{
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

}
