import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  slides = [
    {'image': '../assets/InteressenBA.png'}, 
    {'image': '../assets/VorschlägeBA.png'},
    {'image': '../assets/KalenderBA.png'}
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
