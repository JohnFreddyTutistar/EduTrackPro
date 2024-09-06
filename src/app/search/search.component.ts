import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StatusTableDialogComponent } from './status-table-dialog/status-table-dialog.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {


  public formSearchApplicantByIdentification!: FormGroup;

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    public dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.loginGuest()

    this.builSearchForm();
  }

  dialogStatusTable(){
    this.dialog.open(StatusTableDialogComponent, {
      maxWidth: '500vw',
      maxHeight: '90vh',
      width: '70%',
      data: {},
    })
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
