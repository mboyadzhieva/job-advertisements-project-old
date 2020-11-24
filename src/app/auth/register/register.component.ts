import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMsg: string;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void{
    const formValue = this.formGroup.value;

    if (formValue.password !== formValue.rePassword){
      this.errorMsg = 'Passwords do not match!';

      this.formGroup.reset({
        name: formValue.name,
        email: formValue.email,
        role: formValue.role,
        password: '',
        rePassword: '',
      });

      return;
    }

    this.authService.getUsers().pipe(
      map((stream: User[]) => stream.find(user => user.email === formValue.email || user.name === formValue.name)),
      take(1)
    ).subscribe(
      (response) => {
        if (response){
          this.errorMsg = 'User with this email/name already exists!';
          return;
        }

        this.authService.register({
          ...formValue,
          likedAds: [],
          isActive: true
        }).pipe(
          take(1)
        ).subscribe(
          () => {
            this.router.navigate(['/login']);
          }
        );
      }
    );
  }

  private buildForm(): void{
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }

}
