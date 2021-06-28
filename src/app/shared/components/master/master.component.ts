import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
	selector: 'app-master',
	template: `
    <app-navbar (newItemEvent)="logout($event)" [loggedIn]="loggedIn"></app-navbar>
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
	public logout(newItemEvent: boolean): void {
		this.authService.logout();
		this.router.navigate(['/login']);
	}
}