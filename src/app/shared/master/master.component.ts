import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/auth/src/public-api';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-master',
	template: `
    <app-navbar></app-navbar>
    <section>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </section>
  `
})
export class MasterComponent implements OnInit {
	public loggedIn = false;

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly http: HttpClient
	) {}

	ngOnInit() {
		this.loggedIn = !!this.authService.currentUserValue;
	}

	public testmethod(){
		console.log("test")
		this.http.post<any>('/api/users/login', {
			"email": "man@fred.com",
			"passwort": "Busfahrer***"
		}).subscribe( data =>{
			console.log(data)
		}
			
		)
	}
	public logout(): void {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}
