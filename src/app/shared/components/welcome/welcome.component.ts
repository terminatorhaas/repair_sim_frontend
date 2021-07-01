import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  slides = [
    {'image': 'https://picsum.photos/seed/picsum/1200/300'}, 
    {'image': 'https://picsum.photos/seed/picsum/1200/300'},
    {'image': 'https://picsum.photos/seed/picsum/1200/300'}, 
    {'image': 'https://picsum.photos/seed/picsum/1200/300'}, 
    {'image': 'https://picsum.photos/seed/picsum/1200/300'}
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
