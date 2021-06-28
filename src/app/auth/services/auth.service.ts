/**
 * Based on
 * https://github.com/cornflourblue/angular-7-jwt-authentication-example
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface ApplicationUser {
	access_token: string;
	expiresIn: Date;
	username: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private currentUserSubject: BehaviorSubject<ApplicationUser>;
	public currentUser: Observable<ApplicationUser>;

	constructor(private readonly http: HttpClient) {
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
		return this.http.post<any>('/api/users/login', {
			"email": email,
			"passwort": password
		}).pipe(
			map(access_token => {
				// login successful if there's a jwt token in the response
				if (access_token) {
					// store; user; details; and; jwt; token in local
					// storage; to; keep; user; logged in between; page; refreshes;

					localStorage.setItem('currentUser', JSON.stringify(access_token));
					//this.currentUserSubject.next(user);
				}
				this.currentUserSubject = new BehaviorSubject<ApplicationUser>(
					JSON.parse(localStorage.getItem('currentUser'))
				);
				this.currentUser = this.currentUserSubject.asObservable();
				return access_token;
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
			this.login(email, password);
		})
	
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}
}
