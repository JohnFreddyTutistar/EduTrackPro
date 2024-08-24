import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public LoginForm!: FormGroup;


  constructor(public formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.buildLoginForm()
  }

  private buildLoginForm() {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  sendForm(){
    this.LoginForm.markAllAsTouched();
    if(this.LoginForm.valid){
      console.log("valores enviados del formulario a back", this.LoginForm.value);
    }
  }

}
