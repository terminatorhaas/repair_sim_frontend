import { AppModule } from './../../../../src/app/app.module';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
//import { AppCommonModule } from 'projects/app-common/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [LoginComponent],
	imports: [FormsModule, ReactiveFormsModule, AppModule],
	exports: [LoginComponent]
})
export class AuthModule {}
