import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Advertisement } from '../advertisement.interface';
import { AdService } from '../advertisement.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {

  advertisements: Advertisement[];
  isAuthorized: boolean;

  destroy$ = new Subject<boolean>();

  constructor(private adService: AdService, private authService: AuthService, private router: Router) {
   }

  ngOnInit(): void {
    this.getContent();

    if (this.authService.getLoggedUser().role === 'Company'){
      this.isAuthorized = true;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); // ????
    this.destroy$.unsubscribe();
  }

  onAdDelete(adId: number): void {
    this.adService.deleteAd(adId).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.getContent();
      },
      (error) => {
        console.log('delete response failed: ' + error);
      });
  }

  onAdLike(ad: Advertisement): void{
    ad.likes++;
    this.adService.udpateAd(ad).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.getContent();
      },
      (error) => {
        console.log(error);
      });
  }

  onAdDislike(ad: Advertisement): void{
    ad.likes--;
    this.adService.udpateAd(ad).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => {
        this.getContent();
      },
      (error) => {
        console.log(error);
      });
  }

  onAdApply(ad: Advertisement): void{
    const user = this.authService.getLoggedUser();

    if (user) {
      user.appliedFor.push(ad);

      this.authService.updateUser(user).pipe(
        take(1)
      ).subscribe(
        () => this.router.navigate(['user/ads']),
        (error) => console.log(error)
      );

      // ad.appliedUsers.push(user);

      // this.adService.updateAd(ad).pipe(
      //   take(1)
      // ).subscribe(
      //   () => console.log('The job was applied for by user'),
      //   (error) => console.log(error)
      // );
    }

    return;
  }

  private getContent(): void{
    this.adService.getAds().pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        this.advertisements = response;
      },
      (error) => {
        console.log(error);
      });
  }
}
