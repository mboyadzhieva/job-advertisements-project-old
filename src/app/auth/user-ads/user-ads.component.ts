import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { Advertisement } from 'src/app/advertisement.interface';
import { AdService } from 'src/app/advertisement.service';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.scss']
})
export class UserAdsComponent implements OnInit, OnDestroy {

  adsUserAppliedFor: Advertisement[];
  adsUserWasApprovedFor: Advertisement[];
  companyAds: Advertisement[];
  appliedUsers: User[];
  advertisements: Advertisement[];

  loggedUser: User;
  userRole: string;
  msg: string;

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthService, private adService: AdService, private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.adsUserAppliedFor = [];
    this.adsUserWasApprovedFor = [];
    this.companyAds = [];
    this.appliedUsers = [];
    this.advertisements = [];

    if (this.loggedUser){
      this.userRole = this.loggedUser.role;

      if (this.userRole === 'Person'){
        this.getFilteredAdsForPeople();
      }
      else if (this.userRole === 'Company'){
        this.getFilteredAdsForCompanies();
      }
    }
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onApprove(ad: Advertisement, user: User): void{
    // ad.approvedUser = user;
    let isUserActive = false;
    let hasApprovedUser = true;

    this.adService.getAdById(ad.id).pipe(
      take(1)
    ).subscribe(
      (responseAd) => {
        if (responseAd.approvedUser){
          // hasApprovedUser = true;
          this.msg = 'This advertisement has an approved user (' + responseAd.approvedUser.name + ')!';
          return;
        }else{
          hasApprovedUser = false;
          this.authService.getUserById(user.id).pipe(
            take(1)
          ).subscribe(
            (userResponse) => {
              if (!userResponse.isActive){
                // isUserActive = false;
                this.msg = 'This user is no longer active and cannot be approved for the job!';
                return;
              }else{
                isUserActive = true;
                if (isUserActive && !hasApprovedUser){
                  ad.approvedUser = user;
                  this.adService.updateAd(ad).pipe(
                    take(1)
                  ).subscribe(
                    () => {
                      this.msg = '';
                      // this.router.navigate(['/user/ads']);
                    },
                    (error) => console.log(error)
                  );
                }
              }
            },
            (error) => console.log(error)
          );
        }
      }
    );
  }

  onReject(ad: Advertisement, user: User): void{
    if (ad.approvedUser && ad.approvedUser.id === user.id){
      ad.approvedUser = null;
    }

    this.adService.updateAd(ad).pipe(
      take(1)
    ).subscribe(
      () => {
        // this.msg = 'User: ' + user.name  + ' has been removed from the job!';
        // this.router.navigate(['user/ads']);
      },
      (error) => console.log(error)
    );
  }

  private getFilteredAdsForPeople(): void{
    this.adService.getAds().pipe(
      map((stream) => stream.filter(ad => ad.appliedUsers.length > 0 && ad.isActive === true)),
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {

        response.forEach(element => {
          element.appliedUsers.forEach(user => {
            if (user.id === this.loggedUser.id){
              this.adsUserAppliedFor.push(element);

              if (element.approvedUser && element.approvedUser.id === this.loggedUser.id){
                this.adsUserWasApprovedFor.push(element);
              }
            }
          });
        });

        // UML notacq s fakt tabl i tabl izmereniq

        // edna fakticheska i nqkolko wektorni izmereniq
      },
      (error) => console.log(error)
    );
  }

  private getFilteredAdsForCompanies(): void{

    this.adService.getAds().pipe(
      map((stream) => stream.filter(ads => ads.companyName === this.loggedUser.name && ads.isActive === true)),
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        response.forEach(element => {
          this.companyAds.push(element);
        });
      },
      (error) => console.log(error)
    );
  }
}
