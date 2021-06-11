import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {

  public result: any = {};

  constructor() { }


  ngOnInit(): void {
    this.cargarDatos();
  }
  
  cargarDatos () {
    this.result = JSON.parse(localStorage.getItem('result'));
    console.log(this.result);

  }
}
