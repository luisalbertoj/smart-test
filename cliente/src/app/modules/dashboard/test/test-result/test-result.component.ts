import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss'],
})
export class TestResultComponent implements OnInit {
  public result: any = {};

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.result = JSON.parse(localStorage.getItem('result') || '');
    if (!this.result) this.router.navigate(['dashboard/test']);
    console.log(this.result);
  }

  validarRespuestas() {
    this.router.navigate(['dashboard/test/result']);
  }
}
