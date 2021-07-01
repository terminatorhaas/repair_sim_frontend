import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CalenderService {

    private event;

    setEvent(event) {
        this.event=event;
    }

    getEvent(): any {
        return this.event;
    }

    removeEvent() {
        this.event=null;
    }

}