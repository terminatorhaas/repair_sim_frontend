import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
//import { AppCommonModule } from 'projects/app-common/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule, SharedModule ],
	exports: [LoginComponent]
})
export class AuthModule {}
