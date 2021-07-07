import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

    constructor(
        private http: HttpClient,
      ) { }
      
    getUsers(): Observable<any>{
        return this.http.get<any>('api/users', {});
    }

    getUser(username): Observable<any>{
        return this.http.get<any>('api/users/' + username, {});
    }

}