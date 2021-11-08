import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-unitarias-integracion',
  templateUrl: './plan-unitarias-integracion.component.html',
  styleUrls: ['./plan-unitarias-integracion.component.css']
})
export class PlanUnitariasIntegracionComponent implements OnInit {

  plan: any = {
    title: '',
    organismo: '',
    proyecto: '',
    entregable: '',
    autor: '',
    version: '',
    fechaV: '',
    aprobado: '',
    fechaA: '',
    versionD: '',
    causa: '',
    responsable: '',
    fechaC: '',
    introduccion: '',
    objetivo: '',
    nombreCU: '',
    resumen: '',
    entradas: '',
    equipo: '',
    procesador: '',
    dd: '',
    ram: '',
    aplicacion: '',
    nombre: '',
    software: '',
    identificador: '',
    nversion: '',
    responsableCP: '',
    nameCP:'',
    modulo: '',
    submodulo: '',
    formulario: '',
    descripcion: '',
    resultesperados: '',
    resultreales: '',
    error: '',
    componente: '',
    CP:'',
    resultado:'',
    seguimiento:'',
    conclusion:'',



  }


  constructor() { }

  ngOnInit(): void {
  }

}
