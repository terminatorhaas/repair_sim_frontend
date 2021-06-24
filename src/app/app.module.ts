import { RegisterComponent } from './../../projects/auth/src/lib/components/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';
import { DisplayUserDataComponent } from './display-user-data/display-user-data.component';
import { Routes, RouterModule } from "@angular/router";
import { MaterialModule } from './material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { HttpClientModule } from '@angular/common/http';
import { CalenderComponent } from './calender/calender.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventComponent } from './event/event.component';
import { LoginComponent } from 'projects/auth/src/public-api';
import { ActivityPreferencesComponent } from './activity-preferences/activity-preferences.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from 'projects/auth/src/lib/auth.guard';
import { MasterComponent } from './shared/master/master.component';
import { HomeComponent } from './shared/home/home.component';
import { WelcomeComponent } from './shared/welcome/welcome.component';
import { ChipsMultiSelectComponent } from './chips-multi-select/chips-multi-select.component';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'activity-preferences',
    component: WelcomeComponent
  },
  {
    path: '',
    component: MasterComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'calender',
        component: CalenderComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    InputUserDataFormComponent,
    DisplayUserDataComponent,
    MasterComponent,
    HomeComponent,
    CalenderComponent,
    NavbarComponent,
    EventComponent,
    ActivityPreferencesComponent,
    ChipsMultiSelectComponent
  ],
  imports: [
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
    MatSliderModule,
    RouterModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent],
  exports: [
    NavbarComponent,
  ]
})
export class AppModule { }
