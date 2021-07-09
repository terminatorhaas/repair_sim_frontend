import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Event Component for Modal to Add Remove Or Change Events
 */
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  //Inputs
  @Input() name;
  @Input() colors;
  @Input() eventname: string;
  @Input() date1: Date;
  @Input() date2: Date;


 dateerror = false;

  public dateControl1 = new FormControl();
  public dateControl2 = new FormControl();
  
  activityname :string;
  constructor(public activeModal: NgbActiveModal) { }

  //Initialize date Controlls
  ngOnInit(): void {
    this.dateControl1.setValue(new Date(this.date1));
    this.dateControl2.setValue(new Date(this.date2));

    //Do not override with null when editing event
    if(this.eventname!=null){
      this.activityname = this.eventname;
    }
    //subscribe to changes
    this.dateControl1.valueChanges.subscribe(x => {
      if(this.dateControl1.value<this.dateControl2.value){
        this.dateerror = false;
      }
      else this.dateerror = true;
   })
   this.dateControl2.valueChanges.subscribe(x => {
    if(this.dateControl1.value<this.dateControl2.value){
      this.dateerror = false;
    }
    else this.dateerror = true;
 })
  }
  save(){
    //save event
    if(this.dateControl1.value<this.dateControl2.value){
      this.activeModal.close('save');
    }
    else this.dateerror = true;
  }
  //delete event
  delete(){
    this.activeModal.close('delete');
  }

}
