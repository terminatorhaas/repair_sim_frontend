import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(
    private http: HttpClient,
  ) { }

  getActivitiesForInterest(interest): Observable<any> {
    return this.http.get<any>('api/interessen/' + interest + '/aktivitaeten', {})
  }

  saveActivity(aktivitaetsBezeichnung, aktivitaetsSatz): Observable<any> {
    return this.http.post<any>('api/aktivitaeten', {
        "aktivitaetsBezeichnung": aktivitaetsBezeichnung,
        "aktivitaetsSatz": aktivitaetsSatz
    })
  }

  saveConnection(intId, actId){
    return this.http.put<any>('api/interessen/' + intId + '/Aktivitaeten/' +actId, {});
  }

  changeActivity(id, bezeichnung, satz): Observable<any> {
    return this.http.put<any>('api/aktivitaeten/' + id, {
        "aktivitaetsBezeichnung": bezeichnung,
        "aktivitaetsSatz": satz
    })
  }

  deleteActivity(id): Observable<any> {
    return this.http.delete<any>('api/aktivitaeten/' + id, { })
  }
  
}
