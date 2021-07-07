import { ActivityService } from './../../services/activity.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { trackByHourSegment } from 'angular-calendar/modules/common/util';
import { Router } from '@angular/router';
import { InterestService } from '../../services/interest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivityComponent implements OnInit {

  interessenId: number;

  interests: any[];

  activities: any[];

  constructor(
    private http: HttpClient,
    private interestService: InterestService,
    private activityService: ActivityService,
    private modal: NgbModal,
    private authService: AuthService,
    private router: Router
  ) { }

  
  ngOnInit(): void {
    this.interestService.getInterests().subscribe(data => {
      this.interests = data;
    });
  }

  loadActivities( event){
    this.interessenId = event.value;
    this.activityService.getActivitiesForInterest(event.value).subscribe(data=>{
      this.activities= data;

    })
    console.log(event)
  }

  loadActivitiesById( id ){
    this.activityService.getActivitiesForInterest(id).subscribe(data=>{
      this.activities= data;
    });
  }

  changeActivity( activity ){

    console.log(activity.aktivitaetsBezeichnung);
    console.log(activity.aktivitaetsSatz);


    const modalRef = this.modal.open(AlertComponent);
    modalRef.componentInstance.mode = "changeActivity";
    modalRef.componentInstance.title = "Aktivität verändern";
    modalRef.componentInstance.aktivitaetsBezeichnung = activity.aktivitaetsBezeichnung;
    modalRef.componentInstance.aktivitaetsSatz = activity.aktivitaetsSatz;
    modalRef.result.then((res) => {
      if (res === "change") {
        this.activityService.changeActivity(activity.aktivitaetenID, modalRef.componentInstance.aktivitaetsBezeichnung,
                                            modalRef.componentInstance.aktivitaetsSatz).subscribe(data=>{
          this.loadActivitiesById(this.interessenId);
        });
      }
    }, () => { console.log('Backdrop click') });

  }

  deleteActivity( activity ){


    const modalRef = this.modal.open(AlertComponent);
    modalRef.componentInstance.mode = "delete";
    modalRef.componentInstance.title = "Aktivität löschen";
    modalRef.result.then((res) => {
      if (res === "delete") {
        this.activityService.deleteActivity(activity.aktivitaetenID).subscribe(data=>{
          this.loadActivitiesById(this.interessenId);
        });
      }
    }, () => { console.log('Backdrop click') });
  }

  addActivity(){
    console.log("activity");
    const modalRef = this.modal.open(AlertComponent);
    modalRef.componentInstance.mode = "addActivity";
    modalRef.componentInstance.title = "Aktivität hinzufügen";
    modalRef.result.then((res) => {
      if (res === "save") {
        this.activityService.saveActivity(modalRef.componentInstance.aktivitaetsBezeichnung, modalRef.componentInstance.aktivitaetsSatz).subscribe(data=>{
          console.log("aktivitaetenID:" + data.aktivitaetenID)
          this.activityService.saveConnection(this.interessenId, data.aktivitaetenID).subscribe(data=>{
            this.loadActivitiesById(this.interessenId);
          });
        });
      }
    }, () => { console.log('Backdrop click') });
  }


}
