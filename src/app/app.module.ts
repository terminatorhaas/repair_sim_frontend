import { AdminModule } from './admin/admin.module';
import { RecommendationsComponent } from './core/components/recommendations/recommendations.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
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
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CalenderComponent } from './core/components/calender/calender.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { EventComponent } from './core/components/event/event.component';
import { ActivityPreferencesComponent } from './core/components/activity-preferences/activity-preferences.component';
import { MatIconModule } from '@angular/material/icon';
import { WelcomeComponent } from './core/components/welcome/welcome.component';
import { ChipsMultiSelectComponent } from './shared/components/chips-multi-select/chips-multi-select.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { JwtInterceptor } from './auth/services/jwt-interceptor';
import { ErrorInterceptor } from './auth/services/error.interceptor';
import { LOCALE_ID} from '@angular/core';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { registerLocaleData } from '@angular/common';
import { MasterComponent } from './master/master.component';
registerLocaleData(localeDe, localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    EventComponent,
    CalenderComponent,
    RecommendationsComponent,
    ActivityPreferencesComponent,
  ],
  imports: [
    SharedModule,
    AuthModule,
    AdminModule,
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
    AppRoutingModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: MAT_DATE_LOCALE, useValue: 'de' },
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule { }
