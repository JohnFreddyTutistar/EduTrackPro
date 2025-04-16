import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
  rol: string;
}

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
})
export class MainNavigationComponent implements OnInit {
  greetings!: string;

  user: any;

  public reactiveMenu: MenuItem[] = [
    {
      title: 'Lista de aspirantes',
      icon: 'groups',
      route: 'applicants',
      // rol: ['reviwer', 'guest'],
      rol: 'Administrador',
    },
    {
      title: 'Equipo de revisión',
      icon: 'support_agent',
      route: 'reviewerTeam',
      // rol: ['reviwer', 'guest'],
      rol: 'Administrador',
    },
    {
      title: 'Dashboard',
      icon: 'bar_chart',
      route: 'dashboard',
      // rol: ['reviwer', 'guest'],
      rol: 'Administrador',
    },
    {
      title: 'Estado del aspirante',
      icon: 'content_paste_search',
      route: 'search',
      // rol: ['guest'],
      rol: 'Administrador',
    },
    {
      title: 'Ayuda',
      icon: 'help',
      route: 'help',
      // rol: ['guest'],
      rol: 'Administrador',
    },
  ];

  constructor(public authService: AuthService) {
    this.user = this.authService.getUser();
    console.log('data user: ', this.user);
  }

  ngOnInit(): void {
    this.greetings = this.authService.getGreetings();
  }
}
