import { CalenderService } from '../../services/calender.service';
import { EventComponent } from '../event/event.component';
import { Component, ViewChild, TemplateRef, } from '@angular/core';
import { startOfDay, isSameDay, isSameMonth, } from 'date-fns';
import { lastValueFrom, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

//colors for events
//to be extended
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  }
};

//calender Class
export class Calender {
  calenderID: number;
  bezeichnung: string;
}

/**
 * Component for Calender shows all events for User
 */
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {
  constructor(
    private router: Router
  ) { }

  getNewRecommendations(){
    this.router.navigate(['/insights']);
  }

}