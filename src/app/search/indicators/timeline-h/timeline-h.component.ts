import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'timeline-h',
  templateUrl: './timeline-h.component.html',
  styleUrls: ['./timeline-h.component.scss']
})
export class TimelineHComponent implements OnInit {

  @Input() stages!: Array<any> // Variable que recibe las etapas

  noStages = [
    {
      title: 'Etapa 1',
      date: '08 de septiembre de 2024',
      description: 'Descripción de la etapa 1'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
