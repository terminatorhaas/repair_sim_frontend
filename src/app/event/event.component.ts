import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() name;
  @Input() date1: Date;
  @Input() date2: Date;

  public dateControl1 = new FormControl();
  public dateControl2 = new FormControl();
  
  activityname :string;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.dateControl1.setValue(new Date(this.date1));
    this.dateControl2.setValue(new Date(this.date2));
  }
  save(){
    this.activeModal.close('Close click');
  }

}
