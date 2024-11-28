import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumsService } from 'src/app/services/enums.service';

@Component({
  selector: 'app-register-call',
  templateUrl: './register-call.component.html',
  styleUrls: ['./register-call.component.scss']
})
export class RegisterCallComponent implements OnInit {

  formGroupSend! : FormGroup

  public results!: any[];

  constructor(
    public formBuilder: FormBuilder,
    public enumService: EnumsService
  ) {
    this.formData()
  }

  formData(){
    this.formGroupSend = this.formBuilder.group({
      result: ['', [Validators.required]],
      observation: [''],
      tracing: [''],
      duration: ['']
    })
  }

  ngOnInit(): void {

    this.results = this.enumService.getResults()
  }

  sendData(){
    this.formGroupSend.markAllAsTouched();

    if(this,this.formGroupSend.valid){
      console.log(this,this.formGroupSend.value);
    }
  }

}
