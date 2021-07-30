import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {

  plantilla: any = {
    menuTest: 'Resultados',
    imgBanner: 'assets/images/bannerResultados.png'
  };


  constructor() { }

  ngOnInit(): void {
  }

}
