import { CalenderService } from '../../services/calender.service';
import { EventComponent } from '../event/event.component';
import { Component, ViewChild, TemplateRef, } from '@angular/core';
import { startOfDay, isSameDay, isSameMonth, } from 'date-fns';
import { lastValueFrom, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/services/auth.service';

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

  //Modal
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  //Calender View Week on default
  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  calender: Calender;

  //Modal Data
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  //refresh
  refresh: Subject<any> = new Subject();

  //events in Calender
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  //inject Modal and services
  constructor(
    private modal: NgbModal,
    private authService: AuthService,
    private readonly http: HttpClient,
    private calenderService: CalenderService
  ) {
    //initialize Calender
    this.calender = new Calender();

    //add Event from Recommendation
    if (this.calenderService.getEvent() != null) {
      this.eventFromRecommendation();
    }
  }

  //add Event from Recommendation
  eventFromRecommendation() {
    var newevent = this.calenderService.getEvent();
    this.addNewEvent(new Date(), new Date(), newevent.aktivitaetenID, newevent.aktivitaetsBezeichnung);
    this.calenderService.removeEvent();
  }

  //load all events on initialization
  ngOnInit(): void {
    this.loadEvents().then(res2 => {
      res2.forEach((ereignis) => {
        this.events = [
          ...this.events,
          {
            id: ereignis.ereignisId,
            title: ereignis.bezeichnung,
            start: new Date(ereignis.beginnDatumUhr),
            end: new Date(ereignis.endeDatumUhr),
            color: colors.red,
            draggable: false,
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
          },
        ];
      });
    });
  }

  //load events from Backend
  async loadEvents(): Promise<any> {
    const res1 = await this.calenderService.getCalender(this.authService.currentUserValue.username);
    this.calender.calenderID = res1[0].kalenderID;
    console.log(res1)
    const res2 = await this.calenderService.getEvents(res1[0].kalenderID);
    return res2;
  }

  //set View on Calender
  setView(view: CalendarView) {
    this.view = view;
  }

  //day is Clicked only relevant for month view
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    //only add Event if your not expanding event view
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        //add new event because it doesnt make sense to expand since there are no events or its alteady open
        this.activeDayIsOpen = false;
        this.addNewEvent(new Date(startOfDay(date)), new Date((new Date(startOfDay(date))).getTime() + 30 * 60000), null, null);
      } else {
        //open
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  //hot Clicked relavant for week and day view
  hourClicked(event) {
    //add new event that lasts half an hour
    this.addNewEvent(event.date, new Date(event.date.getTime() + 30 * 60000), null, null)
  }

  //changed Times for event
  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  //handle event on event
  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
    this.editEvent(event);
  }

  //edit an event
  editEvent(event: CalendarEvent) {
    //open Modal for event
    const modalRef = this.modal.open(EventComponent);
    modalRef.componentInstance.name = "Edit";
    modalRef.componentInstance.activityname = event.title;
    modalRef.componentInstance.colors = colors;
    modalRef.componentInstance.date1 = event.start;
    modalRef.componentInstance.date2 = event.end;
    modalRef.result.then((res) => {
      console.log(res);
      if (res === "save") {
        // if user hit save post new data to database
       this.calenderService.changeEvent(event.id, this.calender.calenderID, modalRef.componentInstance.activityname, modalRef.componentInstance.dateControl1.value, modalRef.componentInstance.dateControl2.value)
       .subscribe(data => {
          var changedevent = event;
          this.events = this.events.filter((event) => event !== changedevent);
          event.title = modalRef.componentInstance.activityname;
          event.start = modalRef.componentInstance.dateControl1.value;
          event.end = modalRef.componentInstance.dateControl2.value;
          this.events.push(changedevent);
        });

      }
      else if (res === "delete") {
        //if user hits delete then delete
        console.log("delete")
        this.deleteEvent(event);
      }


    }, () => { console.log('Backdrop click') });
  }

  //delete Event
  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.calenderService.deleteEvent(eventToDelete.id,  this.calender.calenderID).subscribe(data => {
      console.log("deleted event: " + data);
    }
    );
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  addNewEvent(start: Date, end: Date, activityid: number, eventname: string) {

    //Default activity for manually added otherwise id keeps track of the kinda activity the event is from
    if (activityid === null) {
      activityid = 1;
    }

    //initialize Modal
    const modalRef = this.modal.open(EventComponent);
    modalRef.componentInstance.name = 'Add';
    modalRef.componentInstance.date1 = start;
    modalRef.componentInstance.eventname = eventname;
    modalRef.componentInstance.date2 = end;
    modalRef.result.then(() => {
      //add the Event to Calender in Backend
      this.calenderService.addEvent(activityid, this.calender.calenderID, modalRef.componentInstance.activityname,
      modalRef.componentInstance.dateControl1.value, modalRef.componentInstance.dateControl2.value).subscribe((data) => {
        //and in frontend
        this.events = [
          ...this.events,
          {
            id: data.ereignisId,
            title: data.bezeichnung,
            start: new Date(data.beginnDatumUhr),
            end: new Date(data.endeDatumUhr),
            color: colors.red,
            draggable: false,
            resizable: {
              beforeStart: false,
              afterEnd: false,
            },
          },
        ];


      });

    }, () => { console.log('Backdrop click') })


  }
}