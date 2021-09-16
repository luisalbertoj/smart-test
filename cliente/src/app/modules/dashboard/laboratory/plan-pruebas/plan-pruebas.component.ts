import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as htmlDocx from 'html-docx-js/dist/html-docx'; 
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-plan-pruebas',
  templateUrl: './plan-pruebas.component.html',
  styleUrls: ['./plan-pruebas.component.css']
})
export class PlanPruebasComponent implements OnInit {
  plantilla: any = {
    title: 'Plan de pruebas de software'
  };
  client = environment.urlClient;
  fileName = 'ExcelSheet.xlsx';
  plan: any = {
    title: '',
    objetivo: '',
    descripcion: '',
    modulos: '',
    formularios: '',
    metodologia: '',
    nombre: '',
    identificador: '',
    version: '',
    caso: '',
    modulo: '',
    submodulo: '',
    formulario: '',
    descripcionPrueba: '',
    resultadosEsperados: '',
    resultadosReales: '',
    error: '',
    responsables: '',
    riesgo: '',
    impacto: '',
    responsabilidades: '',
  }
  constructor(
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
  }

  public generarWord():void {
    this.spinner.show();
    const impresion = document.getElementById('htmlData');
    let htmlDocument = `
    <!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head>
    <body>${impresion.innerHTML}</body></html>
    `;
    const converted = htmlDocx.asBlob(htmlDocument);
    saveAs(converted, this.plantilla.title + this.plan.title + 'docx');
    setTimeout(() => {
      this.spinner.hide();
    }, 400);
  }

}
