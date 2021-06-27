import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'lib-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;

  error_messages = {
    'fname': [
      { type: 'required', message: 'First Name is required.' },
    ],

    'lname': [
      { type: 'required', message: 'Last Name is required.' }
    ],

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email length.' },
      { type: 'maxlength', message: 'Email length.' },
      { type: 'email', message: 'please enter a valid email address.' }
    ],

    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'nametaken', message: 'Username is taken.' },
      { type: 'minlength', message: 'Username length.' },
      { type: 'maxlength', message: 'Username length.' },
    ],

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
    ],
  }

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private readonly http: HttpClient
  ) {
    this.loginForm = this.formBuilder.group({
      fname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      lname: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        this.checkUsernameTaken(),
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, { 
      validators: this.password.bind(this)
    });
  }

  ngOnInit() {
  }

  checkUsernameTaken() : ValidatorFn{
    return (group: FormGroup): ValidationErrors => {
      if(this.loginForm == null){
        return;
      }
      var user = this.loginForm.controls.username.value;
      this.http.get<any>('/api/users/' +user).subscribe( data => {
        const control1 = this.loginForm.controls.username;
        console.log(data)
        if(data==null){
          console.log("nametaken: false")
          control1.setErrors({nametaken: false});
          return;
        }
        control1.setErrors({nametaken: true});
      });
      return;
    }
  }

  signup(){
    console.log("Sign me Up")
    this.authService.register(this.loginForm.controls.username.value, this.loginForm.controls.email.value, this.loginForm.controls.password.value, this.loginForm.controls.fname.value,
                              this.loginForm.controls.lname.value, new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2], "0");
    
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  
  /*
  ngOnInit()
  {
  	this.userForm = this.formBuilder.group({
  		first_name: ['', [Validators.required, Validators.maxLength(50)]],
  		last_name: ['', [Validators.required, Validators.maxLength(50)]],
  		email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
  		zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
  		password: ['', [Validators.required, Validators.minLength(5), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
  	});
  }
  */

  

}

