import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-plan-pruebas',
  templateUrl: './plan-pruebas.component.html',
  styleUrls: ['./plan-pruebas.component.css'],
})
export class PlanPruebasComponent implements OnInit {
  plantilla: any = {
    title: 'Plan de pruebas de software',
  };
  client = environment.urlClient;
  fileName = 'ExcelSheet.xlsx';
  plan: any = {};
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {}

  public async generarWord(): Promise<void> {
    const impresion: any = document.getElementById('htmlData');
    this.spinner.show();
    const htmlDocument = `
    <!DOCTYPE html><html><head><meta charset="utf-8"><title></title></head>
    <body>${impresion.innerHTML}</body></html>
    `;
    const opt: any = {
      margin: {
        top: 100,
      },
      orientation: 'landscape',
    };
    const converted: any = await asBlob(htmlDocument, opt);
    saveAs(converted, this.plantilla.title + this.plan.title + 'docx');
    setTimeout(() => {
      this.spinner.hide();
    }, 400);
  }
}
