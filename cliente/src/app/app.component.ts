import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'smart-test';
  isLoaded: boolean = false;
  ishttpLoaded: boolean = false;

  constructor(private spinner: NgxSpinnerService, private route: Router) {this.spinner.show();}

  ngOnInit() {
    this.navegacion();
  }
  navegacion() {
    this.route.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          console.log('navigation starts');
          setTimeout(() => {
            
            this.isLoaded = true;
          }, 2000);
        } else if (event instanceof NavigationEnd) {
          console.log('navigation ends');
          setTimeout(() => {
            this.spinner.hide();
            this.isLoaded = true;
          }, 2000);
        }
      },
      (error) => {
        setTimeout(() => {
          this.isLoaded = true;
        }, 200);
        console.log(error);
      }
    );
  }
}
