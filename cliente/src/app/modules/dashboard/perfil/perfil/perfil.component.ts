import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  data: any = {
    lecciones: '10',
    tests: '4',
    laboratorios: '5',
    rendimiento: 90,
  };

  public env = environment.urlMedia;

  constructor(public factory: FactoryService) { }

  ngOnInit(): void {
  }
}


