import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-team-table',
  templateUrl: './review-team-table.component.html',
  styleUrls: ['./review-team-table.component.scss']
})
export class ReviewTeamTableComponent implements OnInit {

  displayedColumns: string[] = [
    'index',
    'profilePhoto',
    'fullName',
    'datebirth',
    'email',
    'phone',
    'position',
    'programName',
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
