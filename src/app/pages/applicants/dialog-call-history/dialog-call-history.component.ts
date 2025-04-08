import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { ICallHistory } from 'src/app/interfaces/call-history.interface';

interface dataCall {
  id: number;
  name: string;
  date: string;
  duration: string;
  result: string;
  observation: string;
  review: string;
  tracing: string;
}

@Component({
  selector: 'app-dialog-call-history',
  templateUrl: './dialog-call-history.component.html',
  styleUrls: ['./dialog-call-history.component.scss'],
})
export class DialogCallHistoryComponent implements OnInit {
  countItems: number = 0;

  name: string = '';

  dataCallHistory: ICallHistory[] = [];

  dataApplicant: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dataHistory: any) {}

  ngOnInit(): void {
    console.log(this.dataHistory.id);
    console.log(this.dataHistory.applicant);

    this.dataApplicant = this.dataHistory.applicant.filter((item: any) => {
      if (item.id === this.dataHistory.id) {
        item.callHistory.forEach((item: any) => {
          this.countItems++;
          item.index = this.countItems;
          item.formattedDate = moment(item.date).format('DD/MMMM/YYYY HH:mm');
        });

        this.name = item.firstName + ' ' + item.firstLastName;

        this.dataCallHistory = item.callHistory;
        console.log(this.dataCallHistory);
      }
    });
  }
}
