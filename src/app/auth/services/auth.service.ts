/*
	Service for Authenticating User
	Based on
	https://github.com/cornflourblue/angular-7-jwt-authentication-example
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { startOfDay } from 'date-fns';

export interface ApplicationUser {
	access_token: string;
	username: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	//currentUser
	private currentUserSubject: BehaviorSubject<ApplicationUser>;

	//Observable for other Classes to check
	public currentUser: Observable<ApplicationUser>;
	//timer for Logout
	private timerLogout: boolean = false;

	constructor(private readonly http: HttpClient, private router: Router,) {
		//get User from local storage
		this.currentUserSubject = new BehaviorSubject<ApplicationUser>(
			JSON.parse(localStorage.getItem('currentUser'))
		);
		//get Observable out
		this.currentUser = this.currentUserSubject.asObservable();
		//start Timer for logout

	}

	ngOnInit(): void {
	}

	public get currentUserValue(): ApplicationUser {
		//getter for User
		return this.currentUserSubject.value;
	}

	//login User
	login(email: string, password: string) {
		console.log("logging in..");
		//get Jwt token
		return this.http.post<any>('http://54.167.133.173:3001/auth/sign-in', {
			"email": email,
			"password": password
		}).pipe(
			map(user => {
				console.log(user);
				// login successful if there's a jwt token in the response
				if (user) {
					// store user details and jwt; token in local
					// storage to keep user logged in between page refreshes;
					localStorage.setItem('currentUser', JSON.stringify(user));
					this.currentUserSubject.next(user);
				}
				this.currentUserSubject = new BehaviorSubject<ApplicationUser>(
					JSON.parse(localStorage.getItem('currentUser'))
				);
				this.currentUser = this.currentUserSubject.asObservable();
				return user;
			})
		);
	
	}

	//register a new User
	register(username: string, email: string, password: string, vorname: string, nachname: string, zeitzone: string, adminFlag: string) :Observable<any>{
		return this.http.post<any>('/api/users/', {
			"username": username,
    		"email": email,
    		"passwort": password,
    		"vorname": vorname,
    		"nachname": nachname,
    		"zeitzone": zeitzone,
    		"adminFlag": adminFlag
		});
	}

	//add User to a new Calender
	addUsertoCalender(username){
			this.http.post<any>('/api/kalender/', { "bezeichnung": "Standard" }).subscribe(data => {
				console.log("Kalender Id" + data.kalenderID)
				console.log("Kalender Id" + username)
				this.http.put<any>('/api/users/' + username + '/Kalender/' + data.kalenderID, {}).subscribe();
			});
	}


	//log user out
	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
		this.router.navigate(["/login"]);
	}

}
