import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  updateForm!: FormGroup;

  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dataUpdateUserForm();
  }

  dataUpdateUserForm() {
    this.updateForm = this.formBuilder.group({
      firstName: [''],
      secondName: [''],
      firstLastName: [''],
      secondLastName: [''],
      birthDate: [''],
      phoneNumber: [''],
      email: [''],
    });
  }

  sendForm() {
    this.updateForm.markAllAsTouched();

    if (this.updateForm.valid) {
      console.log(this.updateForm.value);
    }
  }
}
