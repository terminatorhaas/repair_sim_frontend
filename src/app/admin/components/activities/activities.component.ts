import { ActivitytItem } from '../../../shared/interfaces/activity';
import { ActivityService } from './../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import { InterestService } from '../../services/interest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { InterestItem } from '../../../shared/interfaces/interest';

/*
  Activity Component for admin to change what activities
  get suggested to users
*/

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivityComponent implements OnInit {

  interessenId: number;

  interests: InterestItem[];

  activities: ActivitytItem[];

  //inject Service for interests and activity
  constructor(
    private interestService: InterestService,
    private activityService: ActivityService,
    private modal: NgbModal,
  ) { }

  //get all interests to select from
  ngOnInit(): void {
    this.interestService.getInterests().subscribe(data => {
      this.interests = data;
    });
  }

  //load activities when selection is changed
  loadActivities( event ){
    this.interessenId = event.value;
    this.activityService.getActivitiesForInterest(event.value).subscribe(data=>{
      this.activities= data;

    })
    console.log(event)
  }

  //load activities
  loadActivitiesById( id ){
    this.activityService.getActivitiesForInterest(id).subscribe(data=>{
      this.activities= data;
    });
  }

  //change the Activity that has been selected
  changeActivity( activity: ActivitytItem ){

    //initiate Modal
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

  //delete a Activity
  deleteActivity( activity: ActivitytItem ){
    //initiate Modal
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

  //add a Activity
  addActivity(){
    //initiate Modal
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
