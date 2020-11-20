import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../advertisement.interface';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

  advertisements: Advertisement[];

  constructor() { }

  ngOnInit(): void {
    this.advertisements = [
      {
        id: 1,
        title: 'Ad 1',
        description: 'This is add 1',
        likes: 0,
        type: 'Full-time',
        category: 'New add',
        imageUrl: 'https://cdn.wallpapersafari.com/38/18/Q7WOzv.jpg'
      },
      {
        id: 2,
        title: 'Ad 2',
        description: 'This is add 2',
        likes: 0,
        type: 'Part-time',
        category: 'New add',
        imageUrl: 'https://wallpapercave.com/wp/dG3iPjW.jpg'
      },
      {
        id: 3,
        title: 'Ad 3',
        description: 'This is add 3',
        likes: 0,
        type: 'Remote',
        category: 'New add',
        imageUrl: 'https://lh3.googleusercontent.com/proxy/9SdIt7E1qOF9l4dL-coJXTXXHrL9rLoaUun0_jlUj2poibdEqhJL5QhX5MEcPJjj9lzO8vke-x24AYMelijC1Iph-rTML7M_Eq1tUANyryBy8yAYVkvK9xc'
      }
    ];
  }

  onAdSubmit(ad: Advertisement): void {
    const newAd: Advertisement = {
      ...ad,
      id: this.advertisements.length + 1
    };
    this.advertisements.push(newAd);
  }

}
