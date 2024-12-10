import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { IReviwer } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-team-table',
  templateUrl: './review-team-table.component.html',
  styleUrls: ['./review-team-table.component.scss']
})
export class ReviewTeamTableComponent implements OnInit {

  dataTable: any = [];

  displayedColumns: string[] = [
    'index',
    'profilePhoto',
    'fullname',
    'birthday',
    'email',
    'phone',
    'faculty',
    'position',
    'rol',
    'settings'
  ]

  FormGroupFilter! : FormGroup

  resetFilter(all: boolean){

  }

  showCalendar(){};

  editUser(){

  }

  constructor(
    public formBuilder: FormBuilder, 
    public sharedService: SharedService,
    public authService: AuthService) {
    this.filterForm();

   }

  filterForm() {
    this.FormGroupFilter = this.formBuilder.group({
      formControlFilterBy: [null],
      formControlFilterString: [null],
      formControlFilterFrom: [null],
      formControlFilterTo: [null],
      formControlFilterSelect: [null]
    })
  }

  get formControlFilterBy(){
    return this.FormGroupFilter.controls["formControlFilterBy"];
  }

  get formControlFilterString(){
    return this.FormGroupFilter.controls["formControlFilterString"];
  }

  get formControlFilterFrom(){
    return this.FormGroupFilter.controls["formControlFilterFrom"];
  }

  get formControlFilterTo(){
    return this.FormGroupFilter.controls["formControlFilterTo"];
  }

  get formControlFilterSelect(){
    return this.FormGroupFilter.controls["formControlFilterSelect"];
  }

  ngOnInit(): void {
    this.FormGroupFilter.valueChanges.subscribe(form => {
      this.applyFilters(form)
    })

    this.getDataReviwer();
  }

  applyFilters(form: Event){
    // let filteredData = this.dataTable;

    const filterValue = (form.target as HTMLInputElement).value
    this.dataTable.filter = filterValue.trim().toLowerCase();

    // Aplicar filtros a los datos originales
    // if(form.fullname) {
    //   filteredData = filteredData.filter(fullname => fullname.fullname.toLocaleLowerCase().includes(form.fullname.toLocaleLowerCase()))
    // }
  }

  getDataReviwer(){
    this.sharedService.getDataReviwers().subscribe((data) => {
      this.dataTable = new MatTableDataSource(data) 
    })
  }

  deleteUser(id: string): void{

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este usuario después de eliminarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(id).subscribe({
          next: response => {
            console.log("Usuario eliminado:", response);
            Swal.fire({
              title: 'Eliminado', 
              html: 'El usuario ha sido eliminado.', 
              icon: 'success',
              showConfirmButton: false,
              allowOutsideClick: false,
              timer: 3000,
              timerProgressBar: true,
              willClose: () => {
                window.location.reload();
              },
            });
          },
          error: err => {
            console.error("Error al eliminar el usuario:", err);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          }
        });
      }
    });


    // this.authService.deleteUser(id).subscribe({
    //   next: res => {
    //     console.log("Usuario eliminado ", res);
    //     Swal.fire({
    //       title: 'Borrar',
    //       text: `¿Está seguro/a de eliminar este usuario?.`,
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'Si, salir!',
    //       cancelButtonText: 'Cancelar',
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //         window.location.reload();
    //       }
    //     });
    //   },
    //   error: err => {
    //     console.log("Error al eliminar usuario ", err);
    //   }
    // })
  }

}
