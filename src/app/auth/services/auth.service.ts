/**
 * Based on
 * https://github.com/cornflourblue/angular-7-jwt-authentication-example
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { startOfDay } from 'date-fns';

export interface ApplicationUser {
	access_token: string;
	timeout: Date;
	username: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<ApplicationUser>;
	public currentUser: Observable<ApplicationUser>;

	constructor(private readonly http: HttpClient, private router: Router,) {
		this.currentUserSubject = new BehaviorSubject<ApplicationUser>(
			JSON.parse(localStorage.getItem('currentUser'))
		);
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): ApplicationUser {
		return this.currentUserSubject.value;
	}

	login(email: string, password: string) {
		/*
		return this.http.post<any>('/api/users/login', { username, password }).pipe(
			map(user => {
				// login successful if there's a jwt token in the response
				if (user && user.accessToken) {
					// store; user; details; and; jwt; token in local
					// storage; to; keep; user; logged in between; page; refreshes;

					localStorage.setItem('currentUser', JSON.stringify(user));
					this.currentUserSubject.next(user);
				}

				return user;
			})
		);
		*/
		console.log("logging in..");
		return this.http.post<any>('/api/users/login', {
			"email": email,
			"passwort": password
		}).pipe(
			map(user => {
				console.log(user);
				// login successful if there's a jwt token in the response
				if (user) {
					// store; user; details; and; jwt; token in local
					// storage; to; keep; user; logged in between; page; refreshes;
					var time: number = user.timeout.match("/\d+/g");
					user.timeout = new Date(new Date().getTime() + time);
					console.log("expires in: " + user.expiresIn)
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

	register(username: string, email: string, password: string, vorname: string, nachname: string, zeitzone: string, adminFlag: string) {
		return this.http.post<any>('/api/users/', {
			"username": username,
    		"email": email,
    		"passwort": password,
    		"vorname": vorname,
    		"nachname": nachname,
    		"zeitzone": zeitzone,
    		"adminFlag": adminFlag
		}).subscribe(data => {
			console.log("email" + email)
			console.log("email" + password)
			this.http.post<any>('/api/kalender/', { "bezeichnung": "Standard" }).subscribe(data => {
				console.log("Kalender Id" + data.kalenderID)
				console.log("Kalender Id" + username)
				this.http.put<any>('/api/users/' + username + '/Kalender/' + data.kalenderID, {}).subscribe(data=> {});
			});
		});
		
	
	}

	logout() {
		// remove user from local storage to log user out
		alert("logged out")
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
		this.router.navigate(["/"]);
	}

	timeout(ms) { //pass a time in milliseconds to this function
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
