import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
import { NgxSpinnerService } from 'ngx-spinner';

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


  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  public async generarWord(): Promise<void> {
    const impresion = document.getElementById('htmlData');
    this.spinner.show();
    const htmlDocument = `
    <!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head>
    <body>${impresion.innerHTML}</body></html>
    `;
    const opt: any = {
      margin: {
        top: 100
      },
      orientation: 'landscape'
    };
    const converted: any = await asBlob(htmlDocument, opt);
    saveAs(converted, this.plan.title + this.plan.title + 'docx');
    setTimeout(() => {
      this.spinner.hide();
    }, 400);
  }

}
