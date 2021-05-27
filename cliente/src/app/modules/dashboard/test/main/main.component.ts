import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public plantilla = {
    bannerImg: 'assets/images/test/main.jpg',
    bannerAlt: 'banner pruebas de conocimiento',
    bannerTitulo: 'Pruebas de conocimiento',
    bannerBoton: 'Nueva',
    bannerBotonIcono: 'fas fa-plus',
    botonTarjeta: 'Comenzar',
    botonTarjetaIcono: 'fas fa-arrow-right'
  }

  public tests = [];


  constructor(public factory: FactoryService) { }

  ngOnInit(): void {
    this.loadTests();
  }

  loadTests() {
    this.factory.getAll('pruebaconocimiento').subscribe(
      (response: any) => { this.tests = (response) }

    )
  }
}
