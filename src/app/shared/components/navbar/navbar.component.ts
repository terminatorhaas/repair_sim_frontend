import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Input() admin: boolean;
  @Output() newItemEvent = new EventEmitter<any>();
  constructor(public authService: AuthService,) { }

  ngOnInit(): void {
  }

}