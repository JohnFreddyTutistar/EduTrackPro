import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hideForgotPass: boolean = false;

  public LoginForm!: FormGroup;

  public hide = true

  constructor(
      public formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  sendForm(){
    this.LoginForm.markAllAsTouched();
    if(this.LoginForm.valid){
      console.log("valores enviados del formulario a back", this.LoginForm.value);
    }
  }

}
