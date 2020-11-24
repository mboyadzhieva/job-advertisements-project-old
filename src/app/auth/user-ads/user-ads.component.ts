import { Component, OnDestroy, OnInit } from '@angular/core';
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
  loggedUser: User;
  userRole: string;

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthService, private adService: AdService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.adsUserAppliedFor = [];

    if (this.loggedUser){
      this.userRole = this.loggedUser.role;

      if (this.userRole === 'Person'){
        this.getFilteredAds();
      }
    }
  }

  ngOnDestroy(): void{
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getFilteredAds(): void{
    this.adService.getAds().pipe(
      map((stream) => stream.filter(ads => ads.appliedUsers.length > 0)),
      takeUntil(this.destroy$)
    ).subscribe(
      (response) => {
        response.forEach(element => {
          if (element.appliedUsers.filter(user => user.id === this.loggedUser.id)){
            this.adsUserAppliedFor.push(element);
          }
        });
        debugger;
        console.log('response of the very hardcore map');
      },
      (error) => console.log(error)
    );
  }

}
