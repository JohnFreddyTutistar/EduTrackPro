import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  updateProfileUser!: FormGroup;
  userId!: string;

  constructor(
    private formBiulder: FormBuilder,
    private sharedService: SharedService,
    private route: ActivatedRoute
  ) {
    this.updateProfileUser = this.formBiulder.group({
      firstName: ['', [Validators.required]],
      secondName: [''],
      firstLastName: ['', [Validators.required]],
      secondLastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      possition: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Obtener el usuario id de la url
    this.userId = this.route.snapshot.paramMap.get('id')!;

    console.log('id: ', this.userId);
    console.log('parametros: ', this.route.snapshot.paramMap.keys);

    // Cargar al usuario para editarlo
    this.sharedService.getDataReviwersById(this.userId).subscribe((user) => {
      console.log('data user: ', user);
      this.updateProfileUser.patchValue({
        firstName: user.firstName,
        secondName: user.secondName,
        firstLastName: user.firstLastName,
        secondLastName: user.secondLastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        faculty: user.faculty,
        possition: user.possition,
      });
    });
  }

  // Metodo para actualizar los datos del usuario
  updateForm() {}
}
