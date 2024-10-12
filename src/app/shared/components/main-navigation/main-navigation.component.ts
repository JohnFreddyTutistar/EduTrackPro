import { Component, OnInit } from '@angular/core';

interface MenuItem {
  title: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {

  public reactiveMenu: MenuItem[] = [
    {
      title: 'Lista de aspirantes',
      icon: 'groups',
      route: 'applicants'
    },
    {
      title: 'Equipo de revisión',
      icon: 'support_agent',
      route: 'reviewerTeam'
    },
    {
      title: 'Dashboard',
      icon: 'bar_chart',
      route: 'dashboard'
    },
    {
      title: 'Estado del aspirante',
      icon: 'content_paste_search',
      route: 'search'
    },
    {
      title: 'Ayuda',
      icon: 'help',
      route: 'help'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
