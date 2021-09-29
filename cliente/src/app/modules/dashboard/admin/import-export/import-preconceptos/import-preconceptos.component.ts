import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FactoryService } from 'src/app/services/factory.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-preconceptos',
  templateUrl: './import-preconceptos.component.html',
  styleUrls: ['./import-preconceptos.component.css'],
})
export class ImportPreconceptosComponent implements OnInit {
  data: any;
  constructor(
    private factory: FactoryService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  onFileChange(evt: any): any {
    /* wire up file reader */
    this.spinner.show();
    const target: DataTransfer = evt.target as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.factory
        .post('preconcepto/uploadFiles', { data: this.data })
        .subscribe(
          (response: any) => {
            console.log('Respuesta carga preconceptos', response);
            setTimeout(() => {
              this.spinner.hide();
            }, 400);
          },
          (error: any) => console.log('Error al cargar preconceptos', error)
        );
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
