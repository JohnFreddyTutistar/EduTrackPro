import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'toolbar-component',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  userId!: number;

  user: any;

  constructor(public authService: AuthService, public router: Router) {
    this.user = this.authService.getUser();
  }

  userLoginOn: boolean = false;
  // userData?: any;

  ngOnInit(): void {}

  onLogout() {
    Swal.fire({
      title: 'SALIR',
      text: `Está a punto de salir de EduTrackPRO, ¿Está seguro/a?.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, salir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      }
    });
  }
}
