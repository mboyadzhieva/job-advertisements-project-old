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

  constructor() { }

  ngOnInit(): void {
  }

  onLikeClick(): void{
    this.adLiked.emit(this.advertisement);
  }

}
