import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Advertisement } from '../advertisement.interface';
import { AdService } from '../advertisement.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit, OnDestroy {

  advertisements: Advertisement[];

  destroy$ = new Subject<boolean>();

  constructor(private adService: AdService) {
   }

  ngOnInit(): void {
    this.getContent();
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
        console.log(error);
      });
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
