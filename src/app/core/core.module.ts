
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivityPreferencesComponent } from './components/activity-preferences/activity-preferences.component';
import { CalenderComponent } from './components/calender/calender.component';
import { EventComponent } from './components/event/event.component';
import { MasterComponent } from '../master/master.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDatepickerModule,
    MatChipsModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MaterialModule,
    MatSliderModule,  
    MatCarouselModule.forRoot(),
    RouterModule,

  ],
  declarations: [ActivityPreferencesComponent, CalenderComponent, EventComponent, RecommendationsComponent, WelcomeComponent],
  exports: [
  ]
})
export class CoreModule { }
