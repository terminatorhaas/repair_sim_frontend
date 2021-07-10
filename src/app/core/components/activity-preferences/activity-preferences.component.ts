import { InterestsService } from './../../services/interests.service';
import { UserService } from './../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { lastValueFrom } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserItem } from 'src/app/shared/interfaces/user';


/**
 * Settings for interests of user
 */
@Component({
  selector: 'app-activity-preferences',
  templateUrl: './activity-preferences.component.html',
  styleUrls: ['./activity-preferences.component.css']
})
export class ActivityPreferencesComponent implements OnInit {

  //Inject Services
  constructor(
    private readonly http: HttpClient,
    private authService: AuthService,
    private userService: UserService,
    private interestService: InterestsService
  ) {
  }

  active: boolean = false;
  options: string[];
  user: UserItem;

  //set if chips value has been changes since last save
  chipsValueChanged: boolean;

  //Controls for interests
  optionsWithKey = new Map<string, number>();
  optionsToDelete = new Map<string, number>();
  chipsControl
  chipsControlValue$;

  disabledControl = new FormControl(false);

  //set the value off chips
  setChipsValue() {
    this.chipsControl.setValue(['Denksport', 'Ballsport']);
  }

  //get Interests of User on initialization
  ngOnInit() {
    this.userService.getUser(this.authService.currentUserValue.username).subscribe(data =>{
      this.user= data;
    });
    //get Interests for User
    this.getInteressen().then(res => {
      this.options = res;
      console.log(this.options)
      this.chipsControl = new FormControl();

      this.getSelectedInteressen().then(res => {
        //get already selected Interests
        this.chipsControl.value = res;

        this.chipsControlValue$ = this.chipsControl.valueChanges;

        //check if value has been changed to remove icon from save so you know its not yet saved
        this.chipsControlValue$.pipe(untilDestroyed(this))
        .subscribe((val) => {
          this.chipsValueChanged = true;
        });

        this.disabledControl.valueChanges
          .pipe(untilDestroyed(this))
          .subscribe((val) => {
            console.log("changed")
            this.chipsValueChanged = true;
            if (val) this.chipsControl.disable();
            else this.chipsControl.enable();
          });
        this.intitializeOptionsToDelete();
        this.active = true;
      });

    });

  }

  //get Options to delete to seperate mnap
  intitializeOptionsToDelete() {
    this.optionsWithKey.forEach((value, key) => {
      this.optionsToDelete.set(key, value);
    })
  }

  //subsrbe to changes
  ngAfterViewInit() {
    this.disabledControl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((val) => {
        if (val) this.chipsControl.disable();
        else this.chipsControl.enable();
      });
  }

  //get all interest
  async getInteressen(): Promise<any> {
    var interessen = new Array();
    var locinterests = await this.interestService.getInteressenBackend();

    locinterests.forEach(element => {
      //copy to map
      this.optionsWithKey.set(element.interessenBezeichnung, element.interessenID);
      //push into interessen
      interessen.push(element.interessenBezeichnung);
    });
    return interessen;
  }

  //get selected interests from backend
  async getSelectedInteressen(): Promise<any> {
    var interessen = new Array();
    var locinterests = await this.interestService.getSelectedInteressenBackend(this.authService.currentUserValue.username);
    locinterests.forEach(element => {
      this.optionsWithKey.set(element.interessenBezeichnung, element.interessenID);
      interessen.push(element.interessenBezeichnung);
    });
    console.log("Interessen: ")
    console.log(interessen);
    return interessen;
  }

  //save settings
  save() {
    //add all interests that are selected delete the rest
    this.addSelected().then(res =>{
      this.deleteNotSelected();
      this.chipsValueChanged = false;
    })
  }

  //add selected
  async addSelected(){
    var addedInterests = this.chipsControl.value;

    addedInterests.forEach(async interest => {
      this.optionsToDelete.delete(interest);
      await this.interestService.addSelectedBackend(this.authService.currentUserValue.username, this.optionsWithKey.get(interest));
    });
    return;
  }

  //delete not selected
  deleteNotSelected(){
    this.optionsToDelete.forEach((key, value) => {
      this.interestService.deleteSelectedInteressenBackend(this.authService.currentUserValue.username, key).subscribe(() => console.log('Delete successful'));
    })
  }

}


