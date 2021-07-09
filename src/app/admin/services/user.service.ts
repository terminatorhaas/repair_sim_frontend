import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Service for Users

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
  ) { }

  //get Users from Backend
  getUsers(): Observable<any> {
    return this.http.get<any>('api/users', {});
  }

  //delete User
  deleteUser(username): Observable<any> {
    return this.http.delete<any>('api/users/' + username, {});
  }

  //change User
  changeUser(username, role): Observable<any> {
    return this.http.put<any>('api/users/' + username + '/' + role, {});
  }
  
}
