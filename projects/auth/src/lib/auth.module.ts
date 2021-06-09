import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule  } from '@angular/forms';
//import { AppCommonModule } from 'projects/app-common/src/public-api';

@NgModule({
	declarations: [LoginComponent],
	imports: [ReactiveFormsModule ],
	exports: [LoginComponent]
})
export class AuthModule {}
