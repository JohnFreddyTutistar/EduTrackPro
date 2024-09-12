import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor() { }

  ngOnInit(): void {
  }

}
