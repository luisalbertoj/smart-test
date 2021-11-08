import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-aceptacion',
  templateUrl: './plan-aceptacion.component.html',
  styleUrls: ['./plan-aceptacion.component.css']
})
export class PlanAceptacionComponent implements OnInit {

  plan: any = {
    title:'',
    proyecto: '',
    organismo:'',
    entregable: '',
    autor:'',
    version:'',
    fechaV:'',
    aprobado:'',
    fechaA:'',
    versionDoc:'',
    causa:'',
    responsableCambio:'',
    fechaC:'',
    objeto:'',
    alcance:'',
    nombreProyect:'',
    identificacion:'',
    versionCP:'',
    responsableCP:'',
    nombreCP:'',
    modulo: '',
    submodulo: '',
    formulario: '',
    descripcion: '',
    resultesperados: '',
    resultreales: '',
    error: '',
  
  }

  constructor() { }

  ngOnInit(): void {
  }

}
