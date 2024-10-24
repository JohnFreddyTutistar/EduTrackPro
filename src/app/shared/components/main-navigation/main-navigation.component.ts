import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  rol: string[];
}

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  greetings!: string;

  userLoginOn: boolean = false;
  userData?: any; 

  public reactiveMenu: MenuItem[] = [
    {
      title: 'Lista de aspirantes',
      icon: 'groups',
      route: 'applicants',
      rol: ['reviwer', 'guest']
    },
    {
      title: 'Equipo de revisión',
      icon: 'support_agent',
      route: 'reviewerTeam',
      rol: ['reviwer', 'guest']
    },
    {
      title: 'Dashboard',
      icon: 'bar_chart',
      route: 'dashboard',
      rol: ['reviwer', 'guest']
    },
    {
      title: 'Estado del aspirante',
      icon: 'content_paste_search',
      route: 'search',
      rol: ['guest']
    },
    {
      title: 'Ayuda',
      icon: 'help',
      route: 'help',
      rol: ['guest']
    },
  ]

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn = userLoginOn;
        }
      }
    )

    this.authService.currentUserData.subscribe(
      {
        next:(userData) => {
          console.log("rol de usuario: ", userData[0].rol);
          this.userData = userData
        }
      }
    )

    this.greetings = this.authService.getGreetings();
  }

}
