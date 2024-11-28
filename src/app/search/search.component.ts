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

  searchApplicantByIdentification(login: any){
    this.formSearchApplicantByIdentification.markAllAsTouched();
    if(this.formSearchApplicantByIdentification.valid){

      this.authService.login()
        .subscribe({
          next: res => {
            if(res.length > 0){
              const user = res.find((a: any) => {
                this.documentType = a.documentType
                this.documentNumber = a.documentNumber

                return (
                  a.documentType === login.value.documentType && a.documentNumber === login.value.documentNumber
                )
              });

              if(user){
                console.log("datos corrector");
                
              } else {
                Swal.fire({
                  title: 'Error de consulta en la base de datos',
                  text: 'Verifique los datos e intente nuevamente',
                  icon: 'error',
                });
              }
            }
          }
        })

    }
  }

  dataApplicant(id: string){
    this.sharedService.getDataStatusApplicant(id).subscribe({
      next: res => {
        console.log("respuesta status applicant: ", res);
      }
    })
  }

}
