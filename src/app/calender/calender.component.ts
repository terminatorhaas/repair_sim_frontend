import { EventComponent } from './../event/event.component';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { ConnectableObservable, lastValueFrom, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
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
export class CalenderComponent{

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  calender: Calender;

  constructor(private modal: NgbModal,
    private authService: AuthService,
    private readonly http: HttpClient,
    ) { console.log("Hello From Calender")
    this.calender = new Calender()}

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
              beforeStart: true,
              afterEnd: true,
            },
          },
        ];
      }); 
    });
  }

  async loadEvents() :Promise<any>{
    console.log(this.authService.currentUserValue.username);
    const res1 = await lastValueFrom(this.http.get<Calender>('api/users/' + this.authService.currentUserValue.username + '/Kalender/', {}));
    this.calender.calenderID = res1[0].kalenderID;
    console.log(res1)
    const res2 = await lastValueFrom(this.http.get<any>('api/ereignis/kalender/' + res1[0].kalenderID,{}));
    return res2;
  }

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  /*
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  */

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
        this.addNewEvent(new Date(startOfDay(date)),new Date((new Date(startOfDay(date))).getTime() + 30*60000));
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
    //this.addNewEvent(new Date(startOfDay(date)),new Date((new Date(startOfDay(date))).getTime() + 30*60000))
  }

  hourClicked( event ){
    console.log(event.date);
    this.addNewEvent(event.date,new Date(event.date.getTime() + 30*60000))
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
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    console.log("delete Event")
    console.log(eventToDelete.id)
    console.log(this.calender.calenderID)
    this.http.delete<any>('api/ereignis/' + eventToDelete.id + '/' + this.calender.calenderID,{ }).subscribe(data => {
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

  addNewEvent(start: Date, end: Date) {
    const modalRef = this.modal.open(EventComponent);
    modalRef.componentInstance.name = 'add Event';
    modalRef.componentInstance.date1 = start;
    modalRef.componentInstance.date2 = end;
    modalRef.result.then(() => { 
      console.log(modalRef.componentInstance.activityname);
      console.log(modalRef.componentInstance.dateControl1.value?.toLocaleString());
      console.log(modalRef.componentInstance.dateControl2.value?.toLocaleString());

      console.log("Kalender Id:" + this.calender.calenderID);
      this.http.post<any>('api/ereignis',{
        "aktivitaetenId": 1,
        "kalenderId": this.calender.calenderID,
        "bezeichnung": modalRef.componentInstance.activityname,
        "beginnDatumUhr": new Date(modalRef.componentInstance.dateControl1.value).toISOString(),
        "endeDatumUhr": new Date(modalRef.componentInstance.dateControl2.value).toISOString()
      }).subscribe(data =>{
        console.log(data);
        this.events = [
          ...this.events,
          {
            id: data.ereignisId,
            title: data.bezeichnung,
            start: new Date(data.beginnDatumUhr),
            end: new Date(data.endeDatumUhr),
            color: colors.red,
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
          },
        ]; 


      });
    
    }, () => { console.log('Backdrop click')})

    
  }
}