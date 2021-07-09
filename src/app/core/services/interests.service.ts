import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Observable, Subject } from 'rxjs';

/**
 * Service for Interests
 */
@Injectable({ providedIn: 'root' })
export class InterestsService {

    constructor(
        private http: HttpClient,
    ) { }


    async getInteressenBackend(): Promise<any> {
        const res2 = await lastValueFrom(this.http.get<any>('api/interessen', {}));
        return res2;
    }

    async getSelectedInteressenBackend(username): Promise<any> {
        const res2 = await lastValueFrom(this.http.get<any>('api/users/' + username + '/Interessen', {}));
        return res2;
    }

    addSelectedBackend(username, interest): Promise<any>{
        return lastValueFrom(this.http.put<any>('/api/users/' + username + '/interesse/' + interest, {}));
    }

    deleteSelectedInteressenBackend(username, key): Observable<any> {
        return this.http.delete<any>('/api/users/' + username + '/interessen/' + key);
    }
}