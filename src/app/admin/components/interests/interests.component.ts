import { InterestService } from './../../services/interest.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CalenderService } from 'src/app/core/services/calender.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {

  interests: any[];
  errorMessage;
  constructor(
    private interestService: InterestService,
    private authService: AuthService,
    private calenderService: CalenderService,
    private modal: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.interestService.getInterests().subscribe(data => {
      this.interests = data;
      this.sortInterests();
    });
    //setTimeout(() =>{console.log(this.recommendations)},1000);
  }

  sortInterests(){
    this.interests.sort(function (x, y) {
      return x.interessenBezeichnung.localeCompare(y.interessenBezeichnung);
    });
  }



  remove(element) {
      //remove it
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

  createInterest() {
    console.log("create");
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
