import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';

/**
 * Master Component that all core components are nested in
 */
@Component({
	selector: 'app-master',
	template: `
    <app-navbar (newItemEvent)="logout($event)" [loggedIn]="loggedIn" [admin]="adminflag"></app-navbar>
    <section  style="background-color: #07162B;">
      <div class="container" style="background-color: #07162B;">
        <router-outlet style="background-color: #07162B;"></router-outlet>
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

	//get whether logged in for navbar and stuff
	ngOnInit() {
		this.loggedIn = !!this.authService.currentUserValue;
	}

	public logout(newItemEvent: boolean): void {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}