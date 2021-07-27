import { HttpClient } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';


/*
Component for Registering of User
*/
@Component({
  selector: 'lib-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //register Form
  loginForm: FormGroup;

  passwordmatches: boolean = true;

  errormessage: string;

  //errors for Form
  error_messages = {
    'fname': [
      { type: 'required', message: 'Vorname ist benötigt.' },
    ],

    'lname': [
      { type: 'required', message: 'Nachname ist benötigt.' }
    ],

    'email': [
      { type: 'required', message: 'E-Mail ist benötigt.' },
      { type: 'minlength', message: 'E-Mail Länge.' },
      { type: 'maxlength', message: 'E-Mail Länge.' },
      { type: 'E-Mail', message: 'bitte gib eine valide Email ein.' }
    ],

    'username': [
      { type: 'required', message: 'Username ist benötigt.' },
      { type: 'nametaken', message: 'Username wird bereits verwendet.' },
      { type: 'minlength', message: 'Username Länge.' },
      { type: 'maxlength', message: 'Username Länge.' },
    ],

    'password': [
      { type: 'required', message: 'Passwort is benötigt.' },
      { type: 'minlength', message: 'Passwort Länge.' },
      { type: 'maxlength', message: 'Passwort Länge.' },
      { type: 'passwordNotMatch', message: 'Passwort stimmt nicht überein.' }
    ],
    'confirmpassword': [
      { type: 'required', message: 'Passwort wird benötigt.' }
    ],
  }

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private readonly http: HttpClient,
    private router: Router,
  ) {
    //validators for form
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
        //this.checkUsernameTaken(),
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.required
      ])),
    }, {
      validators: this.password.bind(this)
    });
  }

  ngOnInit() {
  }
  //sign up
  signup() {
    //register User
    this.authService.register(this.loginForm.controls.username.value, this.loginForm.controls.email.value, this.loginForm.controls.password.value, this.loginForm.controls.fname.value,
      this.loginForm.controls.lname.value, new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split('GMT')[1], "0").subscribe(
        data => {
          if (data.error != null) {
            this.errormessage = data.error
          }
          else {
            //add User to Calender so he can have events
            this.authService.addUsertoCalender(this.loginForm.controls.username.value);
            //log user in
            this.authService
              .login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
              .pipe(first())
              .subscribe(
                data => {
                  console.log("current User: " + this.authService.currentUserValue);
                  this.router.navigate(['/']);
                },
                error => {
                  console.log("error")
                  console.log(error)
                }
              );
          }
        });
  }

  password(formGroup: FormGroup) {
    if (typeof formGroup === 'undefined') {
      return;
    }
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    console.log("checking")
    if (password === confirmPassword || confirmPassword == "") {
      this.passwordmatches = true;
      return null
    }
    formGroup.controls.confirmpassword.setErrors({ passwordNotMatch: true });
    this.passwordmatches = false;
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

