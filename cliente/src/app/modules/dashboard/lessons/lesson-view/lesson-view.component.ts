import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css'],
})
export class LessonViewComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  
  files: any[] = [];
  public leccion: any = [];
  public respuestas: any = [];
  public response: any = {
    correctas: [],
    totales: 0,
    resUser: this.respuestas,
    leccion: this.leccion,
    aplica: 'Holaa'
  };

  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.factory.returnAsObservable().subscribe((subs) => {
      subs === true ? this.spinner.hide() : this.spinner.show();
    });
    const slug = this.activateRouter.snapshot.paramMap.get('slug');
    this.loadLeccion(slug);
  }
  loadLeccion(slug) {
    this.factory
      .get('getleccion', slug)
      .subscribe((response: any) => {
        if (response.status === 500) {
          Swal.fire('Ops', response.data, 'info');
        } else {
          this.leccion = response.data;
          console.log(this.leccion);

        }
      });
  }

  respuestaSeleccionada(index, respuesta) {
    this.respuestas[index] = respuesta;
  }

  validarRespuestas() {
    this.response = {
      correctas: [],
      totales: this.leccion.practicar.length,
      resUser: this.respuestas,
      leccion: this.leccion,
    };
    console.log(this.respuestas);
    console.log(this.leccion);
    for (let i = 0; i < this.respuestas.length; i++) {
      if (this.respuestas[i] === this.leccion.practicar[i].respuestaCorrecta) {
        this.response.correctas.push(this.leccion.practicar[i]);
      }
    }
    localStorage.setItem('result', JSON.stringify(this.response));
    this.response.aplica = "Hola";
  }
  finalizarLeccion() {
    this.factory.post('leccion/registrarleccion', {
      leccion: this.leccion,
      respuestas: this.respuestas,
      response: this.response
    }).subscribe(
      (response: any) => {
      this.toast.success(response.msg);
      this.router.navigate(['/dashboard/lesson/home']);
    },
    (error: any) => {
      this.toast.error('Prblema al registrar la leccion');
      console.log(error);
    });
  }
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
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
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
    console.log('Archivos a cargar');
    console.log(this.leccion);
    this.factory.fileUpload('recursoEducativo/upload', this.files, this.leccion).subscribe(
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
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
}
