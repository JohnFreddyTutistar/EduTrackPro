import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  @ViewChildren(MatAccordion) accordion!: QueryList<MatAccordion>;

  openAll(){
    this.accordion.forEach(accordion => accordion.openAll())
  }

  closeAll(){
    this.accordion.forEach(accordion => accordion.closeAll())
  }

  digitalChanelForm!: FormGroup;

  dataFormApplicants!: FormControl;

  isEditable = true;

  constructor(public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.digitaForm()
  }

  // validar minimo de caracteres
  digitaForm(){
    this.digitalChanelForm = this.formBuilder.group({
      identificationType: ['', [Validators.required]],
      identificationNumber: ['', [Validators.required, Validators.maxLength(11)]],
      name: ['', [Validators.required]],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      request: ['', [Validators.required]]
    })
  }

  sendForm(){
    this.digitalChanelForm.markAllAsTouched();

    if(this.digitalChanelForm.valid){
      console.log("data", this.digitalChanelForm.value);

      setTimeout((): void => {
        Swal.fire({
          title: 'Gracias por usar EduTrackPro',
          icon: 'success',
          html: ` <p>Mensaje enviado correctamente</p>`,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 3000,
          timerProgressBar: true,
          willClose: () => {
            window.location.reload();
          },
        });
      }, 3000);
      
      
      Swal.fire({
        title: 'Enviando ...',
        icon: 'info',
        html: 'Registro diligenciado correctamente',
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      Swal.showLoading();

    }
  }

}
