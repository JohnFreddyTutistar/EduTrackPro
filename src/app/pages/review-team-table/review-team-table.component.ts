import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { IReviwer } from 'src/app/interfaces/users';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-team-table',
  templateUrl: './review-team-table.component.html',
  styleUrls: ['./review-team-table.component.scss'],
})
export class ReviewTeamTableComponent implements OnInit {
  dataTable: any = [];

  user: any;

  filterOptions = [
    {
      filterValue: 'name',
      filterName: 'Nombre',
    },
    {
      filterValue: 'lastname',
      filterName: 'Apellido',
    },
    {
      filterValue: 'faculty',
      filterName: 'Facultad',
    },
    {
      filterValue: 'position',
      filterName: 'Cargo',
    },
    {
      filterValue: 'datebirth',
      filterName: 'Fecha de nacimiento',
    },
    {
      filterValue: 'phone',
      filterName: 'Celular',
    },
    {
      filterValue: 'email',
      filterName: 'Email',
    },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator | undefined;
  @ViewChild(MatSort) sort!: MatSort | undefined;

  displayedColumns: string[] = [
    'index',
    'profilePhoto',
    'fullname',
    'birthDate',
    'email',
    'phoneNumber',
    'faculty',
    'position',
    'rol',
    'settings',
  ];

  FormGroupFilter!: FormGroup;

  resetFilter(all: boolean) {}

  showCalendar() {}

  editUser() {}

  constructor(
    public formBuilder: FormBuilder,
    public sharedService: SharedService,
    public authService: AuthService
  ) {
    this.filterForm();
  }

  filterForm() {
    this.FormGroupFilter = this.formBuilder.group({
      formControlFilterBy: [null],
      formControlFilterString: [null],
      formControlFilterFrom: [null],
      formControlFilterTo: [null],
      formControlFilterSelect: [null],
    });
  }

  get formControlFilterBy() {
    return this.FormGroupFilter.controls['formControlFilterBy'];
  }

  get formControlFilterString() {
    return this.FormGroupFilter.controls['formControlFilterString'];
  }

  get formControlFilterFrom() {
    return this.FormGroupFilter.controls['formControlFilterFrom'];
  }

  get formControlFilterTo() {
    return this.FormGroupFilter.controls['formControlFilterTo'];
  }

  get formControlFilterSelect() {
    return this.FormGroupFilter.controls['formControlFilterSelect'];
  }

  ngOnInit(): void {
    this.FormGroupFilter.valueChanges.subscribe((form) => {
      this.applyFilters(form);
    });

    this.getDataReviwer();

    this.user = this.authService.getUser();
    console.log('usuario para validar permisos: ', this.user);
  }

  applyFilters(form: Event) {
    // let filteredData = this.dataTable;

    const filterValue = (form.target as HTMLInputElement).value;
    this.dataTable.filter = filterValue.trim().toLowerCase();

    // Aplicar filtros a los datos originales
    // if(form.fullname) {
    //   filteredData = filteredData.filter(fullname => fullname.fullname.toLocaleLowerCase().includes(form.fullname.toLocaleLowerCase()))
    // }
  }

  countItems: number = 0;

  getDataReviwer() {
    this.sharedService.getDataReviwers().subscribe((data) => {
      data.forEach((item: any) => {
        this.countItems++;
        item.index = this.countItems;
      });

      const formattedData = data.map((item: any) => {
        return {
          ...item,
          birthDate: moment(item.birthDate).format('DD/MM/YYYY'),
        };
      });

      this.dataTable = new MatTableDataSource(formattedData);

      this.dataTable.paginator = this.paginator!;
      this.dataTable.sort = this.sort!;
    });
  }

  deleteUser(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás recuperar este usuario después de eliminarlo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(id).subscribe({
          next: (response) => {
            console.log('Usuario eliminado:', response);
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
          error: (err) => {
            console.error('Error al eliminar el usuario:', err);
            Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
          },
        });
      }
    });
  }
}
