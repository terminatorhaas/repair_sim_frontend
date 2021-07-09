import { UserItem } from '../../interfaces/user';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  //inputs to change the Component
  @Input() mode;
  @Input() name;
  @Input() title;

  @Input() aktivitaetsBezeichnung;
  @Input() aktivitaetsSatz;

  @Input() username;
  @Input() role;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  save(){
      this.activeModal.close('save');
  }
  delete(){
    this.activeModal.close('delete');
  }
  change(){
    this.activeModal.close('change');
  }

}
