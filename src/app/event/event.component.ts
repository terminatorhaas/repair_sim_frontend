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
  @Input() colors;
  @Input() eventname: string;
  @Input() date1: Date;
  @Input() date2: Date;

  /*
  colorsArray = [];
  selectedcolor;
  exportcolor;
  */
 dateerror = false;

  public dateControl1 = new FormControl();
  public dateControl2 = new FormControl();
  
  activityname :string;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.dateControl1.setValue(new Date(this.date1));
    this.dateControl2.setValue(new Date(this.date2));
    this.activityname = this.eventname;

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
    if(this.dateControl1.value<this.dateControl2.value){
      this.activeModal.close('save');
    }
    else this.dateerror = true;
  }
  delete(){
    this.activeModal.close('delete');
  }

}
