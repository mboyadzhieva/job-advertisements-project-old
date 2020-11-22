import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Advertisement } from '../advertisement.interface';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() advertisement: Advertisement;

  @Output() adLiked = new EventEmitter<Advertisement>();
  @Output() adDisliked = new EventEmitter<Advertisement>();
  @Output() adSelectedForDelete = new EventEmitter<number>();

  @Output() adSelectedToApplyFor = new EventEmitter<Advertisement>();
  clicked = false;

  constructor() { }

  ngOnInit(): void {
  }

  onLikeClick(): void{
    this.adLiked.emit(this.advertisement);
  }

  onDislikeClick(): void{
    this.adDisliked.emit(this.advertisement);
  }

  onApplyBtnClick(): void{
    this.adSelectedToApplyFor.emit(this.advertisement);
  }
}
