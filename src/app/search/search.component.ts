import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public formSearch!: FormGroup;

  constructor(private authService: AuthService, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.authService.loginGuest()

    this.builSearchForm();
  }

  builSearchForm() {
    this.formSearch = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
    })
  }

  sendForm(){
    this.formSearch.markAllAsTouched();
    if(this.formSearch.valid){
      console.log("Enviando data", this.formSearch.value);

    }
  }

}
