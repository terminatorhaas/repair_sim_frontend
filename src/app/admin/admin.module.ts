import { MaterialModule } from './../material.module';
import { ActivityComponent } from './components/activities/activities.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterestsComponent } from './components/interests/interests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppModule } from '../app.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    InterestsComponent,
    ActivityComponent,
  ],
	imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, SharedModule, MaterialModule ],
	exports: [InterestsComponent, ActivityComponent]
})
export class AdminModule { }
