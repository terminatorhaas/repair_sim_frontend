import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Output() newItemEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}