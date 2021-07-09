import { InterestService } from './../../services/interest.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { InterestItem } from '../../../shared/interfaces/interest';

/*
  Interest Component for admin to change what Interest
  users can select from
*/

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  interests: InterestItem[];

  errorMessage: string;

  //inject Service for interests
  constructor(
    private interestService: InterestService,
    private modal: NgbModal,
  ) { }

  //get all interests to select from
  ngOnInit(): void {
    this.interestService.getInterests().subscribe(data => {
      this.interests = data;
      this.sortInterests();
    });
  }

  //sort interests
  sortInterests(){
    this.interests.sort(function (x, y) {
      return x.interessenBezeichnung.localeCompare(y.interessenBezeichnung);
    });
  }

  //remove interest
  remove(element) {

      //initialize Modal
      const modalRef = this.modal.open(AlertComponent);
      modalRef.componentInstance.mode = "delete";
      modalRef.componentInstance.title = "Bist du dir Sicher, dass du das Interesse mit allen Aktivitäten löschen möchtest?";
      modalRef.result.then((res) => {
        if (res === "delete") {
          this.interestService.deleteInterest(element.interessenID).subscribe(data => {
            console.log(data);
            this.interests = this.interests.filter(obj => obj !== element);
          },
          error => {
            console.log("could not delete");
          });
        }
      }, () => { console.log('Backdrop click') });
  }

  //Create new Interest
  createInterest() {
    
    //initialize Modal
    const modalRef = this.modal.open(AlertComponent);
    modalRef.componentInstance.mode = "add";
    modalRef.componentInstance.title = "Neues Interesse Hinzufügen";
    modalRef.result.then((res) => {
      if (res === "save") {
        this.interestService.saveInterest(modalRef.componentInstance.name).subscribe(data => {
          this.interests.push(data);
          this.sortInterests();
        });
      }
    }, () => { console.log('Backdrop click') });
  }

  //Change Interest
  changeInterest(element) {
    console.log("change");
    const modalRef = this.modal.open(AlertComponent);
    modalRef.componentInstance.mode = "change";
    modalRef.componentInstance.title = "Interesse verändern";
    modalRef.componentInstance.name = element.interessenBezeichnung;
    modalRef.result.then((res) => {
      if (res === "change") {
        this.interestService.changeInterest(element.interessenID, modalRef.componentInstance.name).subscribe(data => {
          element.interessenBezeichnung= modalRef.componentInstance.name;
          this.sortInterests();
        });
      }
    }, () => { console.log('Backdrop click') });
  }

}
