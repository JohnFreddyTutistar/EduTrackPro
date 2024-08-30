import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'toolbar-component',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isLoggedUser: boolean = false;

  constructor(public authService : AuthService) { }

  ngOnInit(): void {
    console.log("user: ", this.authService.user.forEach(e => e.userName));
  }



}
