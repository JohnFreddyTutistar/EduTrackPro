import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

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

  isEditable = false;

  constructor() { }

  ngOnInit(): void {
  }

}
