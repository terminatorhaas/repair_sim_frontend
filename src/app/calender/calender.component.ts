import { CalenderService } from './../services/calender.service';
import { EventComponent } from './../event/event.component';
import {Component,ViewChild,TemplateRef,} from '@angular/core';
import {startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay,isSameMonth,addHours,} from 'date-fns';
import { ConnectableObservable, lastValueFrom, Subject, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView,} from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

export class Calender {
  calenderID: number;
  bezeichnung: string;
}


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  calender: Calender;

  constructor(
    private modal: NgbModal,
    private authService: AuthService,
    private readonly http: HttpClient,
    private calenderService: CalenderService
  ) {

    console.log("Hello From Calender");
    this.calender = new Calender();

    if (this.calenderService.getEvent() != null) {
      this.eventFromRecommendation();
    }
  }

  eventFromRecommendation(){
    var newevent = this.calenderService.getEvent();
    this.addNewEvent(new Date(), new Date(), newevent.aktivitaetenID, newevent.aktivitaetsBezeichnung);
    this.calenderService.removeEvent();
  }

  ngOnInit(): void {

    this.loadEvents().then(res2 => {
      console.log(res2)
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

  async loadEvents(): Promise<any> {
    console.log(this.authService.currentUserValue.username);
    const res1 = await lastValueFrom(this.http.get<Calender>('api/users/' + this.authService.currentUserValue.username + '/Kalender/', {}));
    this.calender.calenderID = res1[0].kalenderID;
    console.log(res1)
    const res2 = await lastValueFrom(this.http.get<any>('api/ereignis/kalender/' + res1[0].kalenderID, {}));
    return res2;
  }

  modalData: {
    action: string;
    event: CalendarEvent;
  };


  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {

    console.log(date);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
        this.addNewEvent(new Date(startOfDay(date)), new Date((new Date(startOfDay(date))).getTime() + 30 * 60000),null ,null);
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    //this.addNewEvent(new Date(startOfDay(date)),new Date((new Date(startOfDay(date))).getTime() + 30*60000))
  }

  hourClicked(event) {
    console.log(event.date);
    this.addNewEvent(event.date, new Date(event.date.getTime() + 30 * 60000), null, null)
  }

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

  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
    this.editEvent(event);
  }

  editEvent(event: CalendarEvent) {

    //this.modal.open(this.modalContent, { size: 'lg' });
    const modalRef = this.modal.open(EventComponent);
    modalRef.componentInstance.name = "Edit";
    modalRef.componentInstance.activityname = event.title;
    modalRef.componentInstance.colors = colors;
    modalRef.componentInstance.date1 = event.start;
    modalRef.componentInstance.date2 = event.end;
    modalRef.result.then((res) => {
      console.log(res);
      if (res === "save") {
        console.log(modalRef.componentInstance.activityname);
        console.log(modalRef.componentInstance.dateControl1.value?.toLocaleString());
        console.log(modalRef.componentInstance.dateControl2.value?.toLocaleString());


        console.log('api/ereignis/' + event.id + '/' + this.calender.calenderID);
        this.http.put<any>('api/ereignis/' + event.id + '/' + this.calender.calenderID, {
          "kalenderId": this.calender.calenderID,
          "bezeichnung": modalRef.componentInstance.activityname,
          "beginnDatumUhr": new Date(modalRef.componentInstance.dateControl1.value).toISOString(),
          "endeDatumUhr": new Date(modalRef.componentInstance.dateControl2.value).toISOString()
        }).subscribe(data => {
          var changedevent = event;
          this.events = this.events.filter((event) => event !== changedevent);
          event.title = modalRef.componentInstance.activityname;
          event.start = modalRef.componentInstance.dateControl1.value;
          event.end = modalRef.componentInstance.dateControl2.value;
          this.events.push(changedevent);
        });

      }
      else if (res === "delete") {
        console.log("delete")
        this.deleteEvent(event);
      }


    }, () => { console.log('Backdrop click') });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    console.log("delete Event")
    console.log(eventToDelete.id)
    console.log(this.calender.calenderID)
    this.http.delete<any>('api/ereignis/' + eventToDelete.id + '/' + this.calender.calenderID, {}).subscribe(data => {
      console.log(data);
    }
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  addNewEvent(start: Date, end: Date, id: number , eventname: string) {

    //Default activity for manually added
    if(id===null){
      id = 1;
    }
    const modalRef = this.modal.open(EventComponent);
    modalRef.componentInstance.name = 'Add';
    modalRef.componentInstance.date1 = start;
    modalRef.componentInstance.eventname = eventname;
    modalRef.componentInstance.date2 = end;
    modalRef.result.then(() => {
      console.log(modalRef.componentInstance.name);
      console.log(modalRef.componentInstance.dateControl1.value?.toLocaleString());
      console.log(modalRef.componentInstance.dateControl2.value?.toLocaleString());

      console.log("Kalender Id:" + this.calender.calenderID);
      this.http.post<any>('api/ereignis', {
        "aktivitaetenId": id,
        "kalenderId": this.calender.calenderID,
        "bezeichnung": modalRef.componentInstance.activityname,
        "beginnDatumUhr": new Date(modalRef.componentInstance.dateControl1.value).toISOString(),
        "endeDatumUhr": new Date(modalRef.componentInstance.dateControl2.value).toISOString()
      }).subscribe(function (exportcolor, data) {
        console.log(data);
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


      }.bind(this, modalRef.componentInstance.exportcolor));

    }, () => { console.log('Backdrop click') })


  }
}