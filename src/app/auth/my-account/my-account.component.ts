import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  updateProfileUser!: FormGroup
  userId!: number;

  constructor(
    private formBiulder: FormBuilder,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formEditUser();

    // Obtener el usuario id de la url
    this.userId = +this.route.snapshot.paramMap.get('id')!;

    console.log("id: ", this.userId);

    // Cargar al usuario para editarlo
    this.sharedService.getDataReviwersById(this.userId).subscribe(user => {
      console.log("Datos usuario: ", user);
      this.updateProfileUser.patchValue({
        firstName: user.firstName,
        secondName: user.secondName,
        firstLastName: user.firstLastName,
        secondLastName: user.secondLastName,
      })
    })
  }

  formEditUser(){
    this.updateProfileUser = this.formBiulder.group({
      firstName: ['', [Validators.required]],
      secondName: [''],
      firstLastName: ['', [Validators.required]],
      secondLastName: [''],
      birthday: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      position: ['', [Validators.required]],
    })
  }

  // Metodo para actualizar los datos del usuario
  updateForm(){

  }

}
