import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hideForgotPass: boolean = false;

  public LoginForm!: FormGroup;

  public name = '';
  public lastName = '';

  public hide = true;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public http: HttpClient,
    public sharedService: SharedService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.buildLoginForm();
  }

  private buildLoginForm() {
    this.LoginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  sendForm() {
    this.LoginForm.markAllAsTouched();

    if (this.LoginForm.valid) {
      const credential = this.LoginForm.value;

      this.authService.login(credential).subscribe({
        next: (res) => {
          if (res.access_token) {
            Swal.fire({
              title: `Bienvenido a <b>EduTrack<span style="color: #980909">PRO</span></b> usuario <b>${this.name} ${this.lastName}!</b>`,
              icon: 'success',
              confirmButtonColor: '#085092',
              html: `<p>
                            Tén un productivo día, si llegas a tener problemas en nuestro sistema ve a la sección de ayuda o haz <a href="/help" alt="Ayuda en EduTrackPro">clic aquí</a>
                          </p>
                          <h4>* Si crees que se deben activar más funcionalidades o permisos a tu cuenta, escríbenos al correo <a href="mailto:dev@edutrackpro.com" target="_blank">edutrackpro@gmail.com</a></h4>`,
              width: 700,
              background: 'rgba(255,255,255,0.98)',
              backdrop: `
                      rgba(0,48,73,0.5)
                      left top
                      no-repeat
                    `,
              willClose: () => {
                this.router.navigate(['home']);
              },
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Nombre de usuario o contraseña incorrectos',
              icon: 'error',
            });
          }
        },
      });
    }
  }
}
