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

  public dateControl1 = new FormControl(new Date());
  public dateControl2 = new FormControl(new Date());
  
  activityname :string;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  save(){
    this.activeModal.close('Close click');
  }

}
