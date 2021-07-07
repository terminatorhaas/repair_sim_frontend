import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  constructor(
    private http: HttpClient,
  ) { }

  getInterests(): Observable<any> {
    return this.http.get<any>('api/interessen/', {})
  }

  saveInterest(name): Observable<any> {
    return this.http.post<any>('api/interessen/', {
      "interessenBezeichnung": name
    })
  }

  changeInterest(id, name): Observable<any> {
    return this.http.put<any>('api/interessen/' + id, {
      "interessenBezeichnung": name
    })
  }

  deleteInterest(id): Observable<any> {
    return this.http.delete<any>('api/interessen/' + id, { })
  }
  
}
