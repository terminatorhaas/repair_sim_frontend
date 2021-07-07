import { ChipsMultiSelectComponent } from '../../../shared/components/chips-multi-select/chips-multi-select.component';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { MatChip, MatChipList } from '@angular/material/chips';
import { untilDestroyed } from '@ngneat/until-destroy';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';



@Component({
  selector: 'app-activity-preferences',
  templateUrl: './activity-preferences.component.html',
  styleUrls: ['./activity-preferences.component.css']
})
export class ActivityPreferencesComponent implements OnInit {

  constructor(
    private readonly http: HttpClient,
    private authService: AuthService
  ) {
  }

  active: boolean = false;
  options: string[];

  optionsWithKey = new Map<string, number>();
  optionsToDelete = new Map<string, number>();
  chipsControl
  chipsControlValue$;

  disabledControl = new FormControl(false);

  setChipsValue() {
    this.chipsControl.setValue(['Denksport', 'Ballsport']);
  }

  ngOnInit() {
    this.getInteressen().then(res => {
      this.options = res;
      console.log(this.options)
      this.chipsControl = new FormControl();

      this.getSelectedInteressen().then(res => {
        console.log("ausgewählte Interessen");
        console.log(res);
        this.chipsControl.value = res;

        this.chipsControlValue$ = this.chipsControl.valueChanges;

        this.disabledControl.valueChanges
          .pipe(untilDestroyed(this))
          .subscribe((val) => {
            if (val) this.chipsControl.disable();
            else this.chipsControl.enable();
          });
        this.intitializeOptionsToDelete();
        this.active = true;
      });

    });

  }

  intitializeOptionsToDelete() {
    //Copy Map
    this.optionsWithKey.forEach((value, key) => {
      this.optionsToDelete.set(key, value);
    })
  }

  ngAfterViewInit() {
    this.disabledControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((val) => {
        if (val) this.chipsControl.disable();
        else this.chipsControl.enable();
      });
  }

  async getInteressen(): Promise<any> {
    var interessen = new Array();
    var local = await this.getInteressenBackend();

    console.log("result")
    console.log(local)
    local.forEach(element => {
      this.optionsWithKey.set(element.interessenBezeichnung, element.interessenID);
      interessen.push(element.interessenBezeichnung);
    });
    console.log("Interessen: ")
    console.log(interessen);
    return interessen;
    //this.options = interessen;
  }

  async getSelectedInteressen(): Promise<any> {
    var interessen = new Array();
    var local = await this.getSelectedInteressenBackend();

    console.log("result")
    console.log(local)
    local.forEach(element => {
      this.optionsWithKey.set(element.interessenBezeichnung, element.interessenID);
      interessen.push(element.interessenBezeichnung);
    });
    console.log("Interessen: ")
    console.log(interessen);
    return interessen;
    //this.options = interessen;
  }

  async getInteressenBackend(): Promise<any> {
    const res2 = await lastValueFrom(this.http.get<any>('api/interessen', {}));
    return res2;
  }

  async getSelectedInteressenBackend(): Promise<any> {
    const res2 = await lastValueFrom(this.http.get<any>('api/users/' + this.authService.currentUserValue.username + '/Interessen', {}));
    return res2;
  }

  save() {
    this.addSelected().then(res =>{
      this.deleteNotSelected();
    })
    //this.intitializeOptionsToDelete();
  }

  async addSelected(){
    var addedInterests = this.chipsControl.value;

    addedInterests.forEach(async interest => {
      this.optionsToDelete.delete(interest);
      console.log('/api/users/' + this.authService.currentUserValue.username + '/interesse/' + this.optionsWithKey.get(interest));
      await this.http.put<any>('/api/users/' + this.authService.currentUserValue.username + '/interesse/' + this.optionsWithKey.get(interest), {}).subscribe();
    });
    return;
  }

  deleteNotSelected(){
    this.optionsToDelete.forEach((key, value) => {
      console.log("delete:" + key)
      console.log('/api/users/' + this.authService.currentUserValue.username + '/interessen/' + key)
      //this.http.delete<any>('/api/users/terminatorhaas/interessen/7', {});
      this.http.delete<any>('/api/users/' + this.authService.currentUserValue.username + '/interessen/' + key).subscribe(() => console.log('Delete successful'));;
    })
  }

}


