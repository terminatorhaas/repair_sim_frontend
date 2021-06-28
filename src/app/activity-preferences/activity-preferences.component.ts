import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MatChip, MatChipList } from '@angular/material/chips';
import { untilDestroyed } from '@ngneat/until-destroy';



@Component({
  selector: 'app-activity-preferences',
  templateUrl: './activity-preferences.component.html',
  styleUrls: ['./activity-preferences.component.css']
})
export class ActivityPreferencesComponent implements OnInit {

  constructor(private readonly http: HttpClient){

  }

  options = ['Ausdauersport', 'Wassersport', 'Kraftsport', 'Kampfsport', 'Mental Health', 'Ballsport', 'Denksport', 'Freizeitausflüge', 'Familie & Freunde'];

  chipsControl = new FormControl(['Books']);

  chipsControlValue$ = this.chipsControl.valueChanges;

  disabledControl = new FormControl(false);

  setChipsValue() {
    this.chipsControl.setValue(['Shoes', 'Electronics']);
  }

  ngOnInit() {
    this.disabledControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((val) => {
        if (val) this.chipsControl.disable();
        else this.chipsControl.enable();
      });

      return this.http.put<any>('api/users/terminatorhaas/interesse/1', {
      }).subscribe(data => {
        console.log(data);
      })
  }

}


