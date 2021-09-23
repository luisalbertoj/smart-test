import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.scss'],
})
export class CreateResourceComponent implements OnInit {
  plantilla: any = {
    imgBanner: 'assets/images/bannerre.png',
  };

  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  competencias: any = [];
  lecciones: any = [];
  recurso: any = {
    nombre: '',
    contenido: '',
    creador: this.factory.user.id || 1,
    leccion: '',
    leccionId: '',
  };
  element: any = '';
  indexLeccion: any = '';
  constructor(public factory: FactoryService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.cargarCompetencias();
  }
  cargarCompetencias(): void {
    this.factory.getAll('competencia').subscribe(
      (response: any) => {
        this.competencias = response;
        /* console.log(this.competencias); */
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  selectedCompetencia(): any {
    console.log(this.element);
    if (this.element === '') {
      return 0;
    }
    if (this.element > this.competencias[this.element].lecciones.length) {
      return this.toast.info('La competencia no tiene lecciones asociadas');
    }
    this.lecciones = this.competencias[this.element].lecciones;
    this.recurso.competencia = this.competencias[this.element].id;
    console.log('Competencia Seleccionada', this.recurso.competencia);
  }
  selectedLeccion(): any {
    if (this.indexLeccion === '') {
      return 0;
    }
    this.recurso.leccion = this.lecciones[this.indexLeccion].titulo;
    this.recurso.leccionId = this.lecciones[this.indexLeccion].id;
  }
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
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
        // this.uploadFile();
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
  uploadFile(): void {
    this.recurso.competencia = this.competencias[this.element].id;
    console.log('Archivos a cargar');
    console.log(this.recurso);
    this.factory
      .fileUpload('recursoEducativo/upload', this.files, this.recurso)
      .subscribe(
        (response: any) => {
          Swal.fire('Ok', 'Registro creado con exito', 'success');
        },
        (error: any) => {
          Swal.fire('Oops', 'Error al crear el registro', 'error');
          console.log(error);
        }
      );
  }
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = '';
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
