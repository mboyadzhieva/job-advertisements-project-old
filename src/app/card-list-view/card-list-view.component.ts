import { Component, Input } from '@angular/core';
import { Advertisement } from '../advertisement.interface';

@Component({
  selector: 'app-card-list-view',
  templateUrl: './card-list-view.component.html',
  styleUrls: ['./card-list-view.component.scss']
})
export class CardListViewComponent {

  @Input() advertisements: Advertisement[];
  selectedAd: Advertisement;

  constructor() {
   }

  onAdLiked(ad: Advertisement): void{
    this.selectedAd = ad;
    ad.likes++;
  }
}
