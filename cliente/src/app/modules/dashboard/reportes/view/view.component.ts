import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  plantilla: any = {
    imgBanner: 'assets/images/bannerReportes.png',
    tituloBanner: 'Laboratorio de pruebas de software'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
