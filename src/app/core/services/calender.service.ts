import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { Calender } from '../components/calender/calender.component';

@Injectable({ providedIn: 'root' })
export class CalenderService {

    private event;

    constructor(
        private http: HttpClient,
    ) { }
    
    setEvent(event) {
        this.event=event;
    }

    getEvent(): any {
        return this.event;
    }

    removeEvent() {
        this.event=null;
    }

    getCalender(username): Promise<any>{
        return lastValueFrom(this.http.get<Calender>('api/users/' + username + '/Kalender/', {}));
    }

    getEvents(kalenderID): Promise<any>{
        return lastValueFrom(this.http.get<any>('api/ereignis/kalender/' + kalenderID, {}));
    }

    addEvent(activityid, calenderID,  activityname, date1, date2): Observable<any>{
        return this.http.post<any>('api/ereignis', {
            "aktivitaetenId": activityid,
            "kalenderId": calenderID,
            "bezeichnung": activityname,
            "beginnDatumUhr": new Date(date1).toISOString(),
            "endeDatumUhr": new Date(date2).toISOString()
          })
    }

    changeEvent(eventid, calenderID,  activityname, date1, date2): Observable<any>{
        return this.http.put<any>('api/ereignis/' + eventid + '/' + calenderID, {
            "kalenderId": calenderID,
            "bezeichnung": activityname,
            "beginnDatumUhr": new Date(date1).toISOString(),
            "endeDatumUhr": new Date(date2).toISOString()
          })
    }
    deleteEvent(eventid, calenderID): Observable<any>{
        return this.http.delete<any>('api/ereignis/' + eventid + '/' +calenderID, {})
    }

}