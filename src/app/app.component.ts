import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter();

  sideNavOpened = true;

  constructor(private breakPointObserver: BreakpointObserver, private router: Router,){
    const isSmallScreen = this.breakPointObserver.isMatched("(max-width: 799px)")

    if(isSmallScreen){
      this.sideNavOpened = !this.sideNavOpened;
    }
  }
  ngOnInit(): void {
    
  }

  changeOrigin(path: string){
    this.toggleSidenav.emit()
    this.router.navigateByUrl(path);

  }

  
}
