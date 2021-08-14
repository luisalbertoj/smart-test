import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  
  plantilla: any = {
    menuTest: 'Resultados',
    imgBanner: 'assets/images/bannerResultados.png'
  };


  constructor() { }

  ngOnInit(): void {
  }

}
