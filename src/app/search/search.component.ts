import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StatusTableDialogComponent } from './status-table-dialog/status-table-dialog.component';
import { SharedService } from '../services/shared.service';
import Swal from 'sweetalert2';
import { EnumsService } from '../services/enums.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  userLoginOn: boolean = false;
  userData?: any;

  //enums
  public identificationTypes!: any[];
  public membershipStatus!: any[];

  id: string = '';

  public documentType = '';
  public documentNumber = 0;

  public formSearchApplicantByIdentification!: FormGroup;

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    public sharedService: SharedService,
    public enumService: EnumsService
  ) {}

  ngOnInit(): void {
    this.identificationTypes = this.enumService.getIdentificationType();
    console.log('tipos de identificación: ', this.identificationTypes);

    this.userData = this.authService.getUser();

    if (!this.userData) {
      this.authService.loginGuest();
    }

    this.builSearchForm();

    this.dataApplicant(this.id);
  }

  dialogStatusTable() {
    this.dialog.open(StatusTableDialogComponent, {
      maxWidth: '500vw',
      maxHeight: '90vh',
      width: '70%',
      data: {},
    });
  }

  builSearchForm() {
    this.formSearchApplicantByIdentification = this.formBuilder.group({
      documentType: ['', [Validators.required]],
      documentNumber: ['', [Validators.required, Validators.min(99999999)]],
    });
  }

  dataApplicant(id: string) {}
}
