import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Service for Activities

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(
    private http: HttpClient,
  ) { }


  //get Activities from Backend
  getActivitiesForInterest(interest): Observable<any> {
    return this.http.get<any>('api/interessen/' + interest + '/aktivitaeten', {})
  }

  //save Activities to Backend
  saveActivity(aktivitaetsBezeichnung, aktivitaetsSatz): Observable<any> {
    return this.http.post<any>('api/aktivitaeten', {
        "aktivitaetsBezeichnung": aktivitaetsBezeichnung,
        "aktivitaetsSatz": aktivitaetsSatz
    })
  }

  //save Activities Connection to interest
  saveConnection(intId, actId){
    return this.http.put<any>('api/interessen/' + intId + '/Aktivitaeten/' +actId, {});
  }

  //change Activities
  changeActivity(id, bezeichnung, satz): Observable<any> {
    return this.http.put<any>('api/aktivitaeten/' + id, {
        "aktivitaetsBezeichnung": bezeichnung,
        "aktivitaetsSatz": satz
    })
  }

  //delete activity
  deleteActivity(id): Observable<any> {
    return this.http.delete<any>('api/aktivitaeten/' + id, { })
  }
  
}
