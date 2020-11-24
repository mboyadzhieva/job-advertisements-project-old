import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { Advertisement } from '../advertisement.interface';
import { AdService } from '../advertisement.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {

  advertisements: Advertisement[];
  isAuthorized: boolean;
  loggedUser: User;
  userAds: Advertisement[];
  hasApplied: boolean;

  destroy$ = new Subject<boolean>();

  constructor(private adService: AdService, private authService: AuthService, private router: Router) {
   }

  ngOnInit(): void {
    this.getContent();

    this.loggedUser = this.authService.getLoggedUser();

    if (this.loggedUser.role === 'Company'){
      this.isAuthorized = true;
    }
    else{
      this.isAuthorized = false;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true); // ????
    this.destroy$.unsubscribe();
  }

  onAdDelete(adId: number): void {

    this.adService.getAdById(adId).pipe(
      take(1)
    ).subscribe(
      (response) => {
        this.adService.updateAd({
          ...response,
          isActive: false
        }).pipe(
          take(1)
        ).subscribe(
          () => this.getContent()
        );
      },
      (error) => console.log('delete response failed: ' + error)
    );
  }

  onAdLike(ad: Advertisement): void{
    ad.likes++;
    this.adService.updateAd(ad).pipe(
      take(1)
    ).subscribe(
      () => {
        console.log('ad liked');
        //this.getContent();
      },
      (error) => {
        console.log(error);
      });
  }

  onAdDislike(ad: Advertisement): void{
    ad.likes--;
    this.adService.updateAd(ad).pipe(
      take(1)
    ).subscribe(
      () => {
        console.log('ad disliked');
        //this.getContent();
      },
      (error) => {
        console.log(error);
      });
  }

  onAdApply(ad: Advertisement): void{
    const appLiedUsers = ad.appliedUsers;
    appLiedUsers.push(this.loggedUser);

    // TODO: check if user has applied for that job already

    this.adService.getAds().pipe(
      map((stream) => stream.filter(ads => ads.appliedUsers.length > 0)),
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        response.forEach(element => {
          if (element.appliedUsers.includes(this.loggedUser)){
            this.hasApplied = true;
          }
          this.hasApplied = false;
        });
        debugger;
        console.log('response of the very hardcore map');
      },
      (error) => console.log(error)
    );

    if (!this.hasApplied){
      this.adService.updateAd(
      {
        ...ad,
        appliedUsers: appLiedUsers
      }).pipe(
            take(1)
      ).subscribe(
        () => {
          this.router.navigate(['user/ads']);
        },
        (error) => console.log(error)
      );
    }
  }

  private getContent(): void{
    this.adService.getAds().pipe(
      map((stream) => {
        return stream.filter(ad => ad.isActive === true);
      }),
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
