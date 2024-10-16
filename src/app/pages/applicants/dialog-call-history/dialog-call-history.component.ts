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
      name: "John Freddy Tutistar Calvache",
      date: "09/10/2024 14:25",
      duration: "5 min",
      result: "contactado",
      observation: "llamar de nuevo",
      review: "Jorge Rivera",
      tracing: "no"
    },
    {
      id: 2,
      name: "John Freddy Tutistar Calvache",
      date: "10/10/2024 14:25",
      duration: "2 min",
      result: "contactado",
      observation: "llamar de nuevo",
      review: "Jorge Rivera",
      tracing: "no"
    },
    {
      id: 3,
      name: "John Freddy Tutistar Calvache",
      date: "15/10/2024 14:25",
      duration: "-----",
      result: "no contestó",
      observation: "-----",
      review: "Jorge Rivera",
      tracing: "-----"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
