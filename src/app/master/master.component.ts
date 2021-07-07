import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
	selector: 'app-master',
	template: `
    <app-navbar (newItemEvent)="logout($event)" [loggedIn]="loggedIn" [admin]="adminflag"></app-navbar>
    <section>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </section>
  `
})
export class MasterComponent implements OnInit {
	loggedIn = false;
	adminflag = false;

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly http: HttpClient
	) {}

	ngOnInit() {
		this.loggedIn = !!this.authService.currentUserValue;
		if(this.authService.currentUserValue.role==="admin"){
			this.adminflag=true
		}
	}

	public logout(newItemEvent: boolean): void {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}