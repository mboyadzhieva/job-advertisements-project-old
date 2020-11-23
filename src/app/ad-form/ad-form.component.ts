import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Advertisement } from '../advertisement.interface';
import { AdService } from '../advertisement.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.component.html',
  styleUrls: ['./ad-form.component.scss']
})
export class AdFormComponent implements OnInit, OnDestroy {

  @Output() adSubmitted = new EventEmitter<Advertisement>();

  ad: Advertisement;
  formGroup: FormGroup;
  companyName: string;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private adService: AdService,
              private authService: AuthService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.ad = {
      title: '',
      description: '',
      type: '',
      category: '',
      imageUrl: '',
      likes: 0,
      appliedUsers: [],
      isActive: true,
      companyName: ''
    };
   }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (params) => {
        const id = params.id; // id is set correctly
        if (id){
          this.getAd(id);
        }
      }
    );

    console.log('did not get the intended params');
    this.buildForm();

    this.companyName = this.authService.getLoggedUser().name;
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void{
    this.ad.title = this.formGroup.value.title;
    this.ad.description = this.formGroup.value.description;
    this.ad.type = this.formGroup.value.type;
    this.ad.category = this.formGroup.value.category;
    this.ad.imageUrl = this.formGroup.value.imageUrl;

    const ad: Advertisement = {
      ...this.formGroup.value,
      companyName: this.companyName,
      isActive: true,
      likes: 0,
      appliedUsers: []
    };

    if (!ad.id){
      this.adService.createAd({...ad}).pipe(
        take(1)
      ).subscribe(
        () => {
          this.router.navigate(['/job-ads']);
          console.log('created ad: ' + ad);
        },
        (error) => {
          console.log('error while creating an ad: ' + error);
      });

      return;
    }

    this.adService.udpateAd(this.ad).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.router.navigate(['job-ads']);
        console.log('the updated ad is: ' + this.ad);
      },
      (error) => {
        console.log('ad update failed: ' + error);
      }
    );
  }

  private getAd(id: number): void{
      this.adService.getAdById(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        console.log('response' + response);
        this.ad = response;
        this.buildForm();
      },
      (error) => {
        console.log(error);
      });
    }

    private buildForm(): void{

      this.formGroup = this.fb.group({
        id: this.ad.id,
        title: [this.ad.title, [Validators.required, Validators.minLength(10)]],
        description: [this.ad.description, [Validators.required, Validators.minLength(10)]],
        type: [this.ad.type, [Validators.required]],
        category: [this.ad.category, [Validators.required, Validators.minLength(10)]],
        imageUrl: [this.ad.imageUrl, Validators.required]
      });
    }
}
