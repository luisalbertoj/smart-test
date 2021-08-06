import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-pruebas',
  templateUrl: './plan-pruebas.component.html',
  styleUrls: ['./plan-pruebas.component.css']
})
export class PlanPruebasComponent implements OnInit {
  plantilla: any = {
    title: 'Plan de pruebas de software'
  };
  constructor() { }

  ngOnInit(): void {
  }

}
