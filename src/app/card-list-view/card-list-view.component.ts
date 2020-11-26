import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Advertisement } from '../advertisement.interface';
import { AdService } from '../advertisement.service';

@Component({
  selector: 'app-card-list-view',
  templateUrl: './card-list-view.component.html',
  styleUrls: ['./card-list-view.component.scss']
})
export class CardListViewComponent {

  @Input() advertisements: Advertisement[];

  @Output() adDeleted = new EventEmitter<number>();
  @Output() adLiked = new EventEmitter<Advertisement>();
  @Output() adSelectedToApplyFor = new EventEmitter<Advertisement>();

  selectedAd: Advertisement;

  constructor(private adService: AdService) {
   }

  onAdLiked(ad: Advertisement): void{
    this.adLiked.emit(ad);
  }

  onAdSelectedForApplication(ad: Advertisement): void{
    this.adSelectedToApplyFor.emit(ad);
  }
}
