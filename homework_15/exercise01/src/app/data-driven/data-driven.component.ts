import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import { DataServiceService } from '../data-service.service';
@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styles: []
})
export class DataDrivenComponent implements OnInit {
  signupForm:FormGroup;
  signInForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private service:DataServiceService) { 
    this.signupForm = formBuilder.group({"userData":formBuilder.group({
      "firstName":['', [Validators.required]],
      "lastName":['', [Validators.required]],
      "email":['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")], this.service.emailValidator()]
    }),
     "password":['',[Validators.required]],
     "confirmPassword": ['',[Validators.required]],
     "agree":[false]},{validator:[this.checkPasswords, this.checkAgree]});
     this.signInForm = formBuilder.group({"email":['', [Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
    "password":['',[Validators.required]],"rememberMe":[false]});
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }     
  }

  checkAgree(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.agree.value;
    return pass ? null : { notAgree: true }     
  }
  ngOnInit() {
  };
  signup(){
    // alert(JSON.stringify(this.signupForm.value));
    this.service.signup(this.signupForm.value).subscribe(data=>{
      // alert(JSON.stringify(data));
      this.signupForm.reset();
    });
  }
  signIn(){
    this.service.login(this.signInForm.get("email").value, this.signInForm.get("password").value).subscribe(data=>alert(JSON.stringify(data)));
  }
  getProtected(){
    this.service.getProtected().subscribe(data=>alert(JSON.stringify(data)),(err)=>alert("Fail to get protected!"+JSON.stringify(err)));
  }
}
