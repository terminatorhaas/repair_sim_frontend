import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Service for Interests

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  constructor(
    private http: HttpClient,
  ) { }

  //get Interest from Backend
  getInterests(): Observable<any> {
    return this.http.get<any>('api/interessen/', {})
  }

  //save Interest to Backend
  saveInterest(name): Observable<any> {
    return this.http.post<any>('api/interessen/', {
      "interessenBezeichnung": name
    })
  }

  //change Interest
  changeInterest(id, name): Observable<any> {
    return this.http.put<any>('api/interessen/' + id, {
      "interessenBezeichnung": name
    })
  }

  //delete Interest
  deleteInterest(id): Observable<any> {
    return this.http.delete<any>('api/interessen/' + id, { })
  }
  
}
