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
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  userLoginOn: boolean = false;
  userData?: any; 

  //enums
  public identificationTypes!: any[];
  public membershipStatus!: any[];

  id: string = ''

  public documentType = '';
  public documentNumber = 0;

  public formSearchApplicantByIdentification!: FormGroup;

  constructor(
    private authService: AuthService,
    public formBuilder: FormBuilder,
    public dialog : MatDialog,
    public sharedService: SharedService,
    public enumService: EnumsService
  ) {}

  ngOnInit(): void {

    this.identificationTypes = this.enumService.getIdentificationType()
    console.log("tipos de identificación: ", this.identificationTypes);

    this.authService.loginGuest()

    this.builSearchForm();

    this.authService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      }
    )

    this.authService.currentUserData.subscribe(
      {
        next:(userData) => {
          this.userData = userData
        }
      }
    )

    this.dataApplicant(this.id)
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
      documentNumber: ['', [Validators.required, Validators.min(99999999)]],
    })
  }

  dataApplicant(id: string){
    this.formSearchApplicantByIdentification.markAllAsTouched();
    
    if(this.formSearchApplicantByIdentification.valid){

      const dataApplicant = this.formSearchApplicantByIdentification.value;

      console.log(dataApplicant.documentType);
      console.log(dataApplicant.documentNumber);


      this.sharedService.getDataStatusApplicant(id).subscribe({
        next: res => {
          if(res.length > 0){
            const data = res.find((a: any) => {
              console.log("tipo de documento: ", a.documentType);
              console.log("numero de coumento: ", a.documentNumber);
              return (
                a.documentType === dataApplicant.documentType && 
                a.documentNumber === dataApplicant.documentNumber
              )
            });

            if(data){
              console.log("datos insertados correctamente");
            } else {
              console.log("dastos incorrectos");
            }
          }
        }
      })
    }
  }

}
