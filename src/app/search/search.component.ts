import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public formSearchApplicantByIdentification!: FormGroup;

  constructor(private authService: AuthService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authService.loginGuest()

    this.builSearchForm();
  }

  builSearchForm() {
    this.formSearchApplicantByIdentification = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
    })
  }

  searchApplicantByIdentification(){
    this.formSearchApplicantByIdentification.markAllAsTouched();
    if(this.formSearchApplicantByIdentification.valid){
      console.log("Enviando data", this.formSearchApplicantByIdentification.value);

    }
  }

}
