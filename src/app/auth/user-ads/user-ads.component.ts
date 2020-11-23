import { Component, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/advertisement.interface';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.scss']
})
export class UserAdsComponent implements OnInit {

  adsUserAppliedFor: Advertisement[];
  adsUserWasApprovedFor: Advertisement[];
  loggedUser: User;
  userRole: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();

    if (this.loggedUser){
      this.userRole = this.loggedUser.role;

      if (this.userRole === 'Person'){
        this.adsUserAppliedFor = this.loggedUser.appliedFor;

        this.adsUserWasApprovedFor = this.loggedUser.acceptedFor;
      }

    }
  }

}
