import { Component, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { asBlob } from 'html-docx-js-typescript';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-plan-aceptacion',
  templateUrl: './plan-aceptacion.component.html',
  styleUrls: ['./plan-aceptacion.component.css']
})
export class PlanAceptacionComponent implements OnInit {

  plan: any = {
    title: '',
    proyecto: '',
    organismo: '',
    entregable: '',
    autor: '',
    version: '',
    fechaV: '',
    aprobado: '',
    fechaA: '',
    versionDoc: '',
    causa: '',
    responsableCambio: '',
    fechaC: '',
    objeto: '',
    alcance: '',
    nombreProyect: '',
    identificacion: '',
    versionCP: '',
    responsableCP: '',
    nombreCP: '',
    modulo: '',
    submodulo: '',
    descripcion: '',
    resultesperados: '',
    resultreales: '',
    pasos:''
  };

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  public async generarWord(): Promise<void> {
    const impresion = document.getElementById('htmlData3');
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
