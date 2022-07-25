import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Service for Users
 */
@Injectable({ providedIn: 'root' })
export class RecommendationService {

    constructor(
        private http: HttpClient,
      ) { }
      
    getRecommendationBackend(username): Observable<any>{
        return this.http.get<any>('http://54.167.133.173:3001/simulation/'+1+'/customer/'+1+'/logevent', {});
        return this.http.get<any>('api/users/' + username + '/vorschlaege', {});
    }

}