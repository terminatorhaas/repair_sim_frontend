import { AppModule } from './../../../../src/app/app.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
//import { AppCommonModule } from 'projects/app-common/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
	declarations: [LoginComponent, RegisterComponent],
	imports: [FormsModule, ReactiveFormsModule, AppModule],
	exports: [LoginComponent]
})
export class AuthModule {}
