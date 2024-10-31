import { Component, OnInit } from '@angular/core';

interface dataCall {
  id: number,
  name: string,
  date: string,
  duration: string,
  result: string,
  observation: string,
  review: string,
  tracing: string
}

@Component({
  selector: 'app-dialog-call-history',
  templateUrl: './dialog-call-history.component.html',
  styleUrls: ['./dialog-call-history.component.scss']
})
export class DialogCallHistoryComponent implements OnInit {

  data: dataCall[] = [
    {
      id: 1,
      name: "Ivan Dario Delgado Calvache",
      date: "09/10/2024 14:25",
      duration: "5 min",
      result: "contactado",
      observation: "llamar de nuevo",
      review: "John Tutistar",
      tracing: "no"
    },
    {
      id: 2,
      name: "Ivan Dario Delgado Calvache",
      date: "10/10/2024 14:25",
      duration: "2 min",
      result: "contactado",
      observation: "llamar de nuevo",
      review: "John Tutistar",
      tracing: "no"
    },
    {
      id: 3,
      name: "Ivan Dario Delgado Calvache",
      date: "15/10/2024 14:25",
      duration: "-----",
      result: "no contestó",
      observation: "-----",
      review: "John Tutistar",
      tracing: "-----"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
