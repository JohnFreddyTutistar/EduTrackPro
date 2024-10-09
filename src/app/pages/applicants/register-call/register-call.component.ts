import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-call',
  templateUrl: './register-call.component.html',
  styleUrls: ['./register-call.component.scss']
})
export class RegisterCallComponent implements OnInit {

  formGroupSend! : FormGroup

  constructor(public fb: FormBuilder) {
    this.formData()
  }

  formData(){
    this.formGroupSend = this.fb.group({
      result: ['', [Validators.required]],
      observation: [''],
      tracing: ['', Validators.required],
      duration: ['']
    })
  }

  ngOnInit(): void {
  }

  sendData(){
    this.formGroupSend.markAllAsTouched();

    if(this,this.formGroupSend.valid){
      console.log(this,this.formGroupSend.value);
    }
  }

}
