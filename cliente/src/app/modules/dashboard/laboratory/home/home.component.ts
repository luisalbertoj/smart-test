import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  plantilla: any = {
    imgBanner: 'assets/images/bannerre.png',
    tituloBanner: 'Laboratorio de pruebas de software'
  };

  constructor(
    private factory: FactoryService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.factory.returnAsObservable().subscribe((subs) => {
      subs === true ? this.spinner.hide() : this.spinner.show();
    });
  }

  newLaboratory(): any {
    this.route.navigate(['/dashboard/laboratory/view']);
  }

}
