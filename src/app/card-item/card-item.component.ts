import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Advertisement } from '../advertisement.interface';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

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

  loggedUser: User;
  companyName: string;
  clicked = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();

    if (this.loggedUser && this.loggedUser.role === 'Company'){
      this.companyName = this.loggedUser.name;
    }
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
