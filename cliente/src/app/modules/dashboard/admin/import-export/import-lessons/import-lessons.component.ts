import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-lessons',
  templateUrl: './import-lessons.component.html',
  styleUrls: ['./import-lessons.component.css'],
})
export class ImportLessonsComponent implements OnInit {
  files: any[] = [];
  data: any;
  constructor(
    private toast: ToastrService,
    private factory: FactoryService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {}
  /**
   * on file drop handler
   */
  onFileDropped($event: any): void {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files: any): void {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number): void {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number): any {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>): void {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any): any {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  upload(): void {
    /* console.log(this.files);
    this.files[0].type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'?
    this.toast.error('Solo se permiten archivos xlsx'): 0; */
    this.spinner.show();
    this.factory.post('lesson/importLessons', { data: this.data }).subscribe(
      (response: any) => {
        console.log('Respuesta carga lecciones', response);
        this.toast.success(response.message);
        console.log('Lecciones cargadas:', response);
        setTimeout(() => {
          this.spinner.hide();
        }, 400);
      },
      (error: any) => {
        console.log('Error al cargar lecciones', error);
        this.toast.error('Error al cargar las lecciones');
      }
    );
  }
  onFileChange(evt: any): any {
    /* wire up file reader */
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
    };
    reader.readAsBinaryString(target.files[0]);
  }
}
