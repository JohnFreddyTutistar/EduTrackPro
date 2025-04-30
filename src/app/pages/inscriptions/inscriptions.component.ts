import { Component, OnInit } from '@angular/core';
import { EnumsService } from 'src/app/services/enums.service';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss'],
})
export class InscriptionsComponent implements OnInit {
  identificationType!: any[];

  constructor(public enumService: EnumsService) {}

  ngOnInit(): void {
    this.identificationType = this.enumService.getIdentificationType();
  }
}
