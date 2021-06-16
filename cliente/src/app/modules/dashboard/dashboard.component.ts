import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  title = 'Smart Test Dashboard';
  constructor(private spinner: NgxSpinnerService, private route: Router) {}

  ngOnInit() {
  }
  navegacion() {
    this.route.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          console.log('navigation starts');
          setTimeout(() => {
            
          }, 5000);
        } else if (event instanceof NavigationEnd) {
          console.log('navigation ends');
          setTimeout(() => {
            this.spinner.hide();
          }, 5000);
        }
      },
      (error) => {
        setTimeout(() => {
        }, 2000);
        console.log(error);
      }
    );
  }
}
