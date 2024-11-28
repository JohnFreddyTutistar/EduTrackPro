import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnumsService } from 'src/app/services/enums.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'contact-form-component',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  public identificationTypes!: any[];
  
  digitalChanelForm!: FormGroup;

  dataFormApplicants!: FormControl;

  isEditable = true;

  constructor(
    public enumService: EnumsService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.identificationTypes = this.enumService.getIdentificationType()
    this.digitaForm()
  }

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
          title: `Gracias por usar <b>EduTrack<span style="color: #980909">PRO</span></b>`,
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
