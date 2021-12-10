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
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef | any;

  classStep: any = {
    one: 'active',
    two: '',
    three: '',
    fourt: '',
  };

  files: any[] = [];
  public leccion: any = [];
  public respuestas: any = [];
  public response: any = {
    correctas: [],
    totales: 0,
    resUser: this.respuestas,
    leccion: this.leccion,
    aplica: 'Holaa',
  };

  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.factory.returnAsObservable().subscribe((subs: any) => {
      subs === true ? this.spinner.hide() : this.spinner.show();
    });
    const slug = this.activateRouter.snapshot.paramMap.get('slug');
    this.loadLeccion(slug);
  }
  loadLeccion(slug: any): void {
    this.factory.get('getleccion', slug).subscribe((response: any) => {
      if (response.status === 500) {
        Swal.fire('Ops', response.data, 'info');
      } else {
        this.leccion = response.data;
        console.log(this.leccion);
      }
    });
  }

  change(prev: any, step: any): void {
    this.classStep[step] = 'active';
    this.classStep[prev] = 'done';
  }

  respuestaSeleccionada(index: number, respuesta: any): void {
    this.respuestas[index] = respuesta;
  }

  validarRespuestas(): void {
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
        if (this.leccion.practicar[i].valor) {
          this.response.nota += parseInt(this.leccion.practicar[i].valor);
        }
      }
    }
    localStorage.setItem('result', JSON.stringify(this.response));
    this.response.aplica = `<p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><strong><span style="font-size:16px;line-height:107%;color:#C00000;">Caso de estudio</span></strong></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><em><span style="font-size:16px;line-height:107%;color:#C00000;">Presentaci&oacute;n del caso</span></em></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><span style="font-size:16px;line-height:107%;color:#C00000;">&nbsp; &nbsp;Descripci&oacute;n del caso de estudio</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:200%;font-size:15px;font-family:"Calibri",sans-serif;text-align:justify;'><span style="font-size:16px;line-height:200%;color:#0070C0;">&lt;&lt; Se recomienda hacer uso del m&eacute;todo narrativo para describir el Caso. Este m&eacute;todo permite explicar el flujo de acciones del Caso dentro de su contexto o circunstancias espec&iacute;ficas en las cuales &eacute;stas ocurrieron.</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:200%;font-size:15px;font-family:"Calibri",sans-serif;text-align:justify;'><span style="font-size:16px;line-height:200%;color:#0070C0;">El producto de esta narraci&oacute;n es el relato, que organiza en una secuencia coherente los acontecimientos en funci&oacute;n de su contribuci&oacute;n al desarrollo del Caso&gt;&gt;</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><span style="font-size:16px;line-height:107%;color:#C00000;">&nbsp; &nbsp;Definici&oacute;n del problema</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:200%;font-size:15px;font-family:"Calibri",sans-serif;text-align:justify;'><span style="font-size:16px;line-height:200%;color:#0070C0;">&lt;&lt;Definir el problema y presentar el caso de estudio, se puede formular el problema como un estado negativo&gt;&gt;</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;text-indent:35.4pt;'><span style="font-size:16px;line-height:107%;color:#C00000;">Problema principal</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:200%;font-size:15px;font-family:"Calibri",sans-serif;text-align:justify;'><span style="font-size:16px;line-height:200%;color:#0070C0;">&lt;&lt;Centrar el an&aacute;lisis en un problema debidamente definido&gt;&gt;</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;text-indent:35.4pt;'><span style="font-size:16px;line-height:107%;color:#C00000;">Problemas secundarios</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:200%;font-size:15px;font-family:"Calibri",sans-serif;text-align:justify;'><span style="font-size:16px;line-height:200%;color:#0070C0;">&lt;&lt;Centrar el an&aacute;lisis en los problemas secundarios identificados&gt;&gt;</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><span style="font-size:16px;line-height:107%;color:#C00000;">&nbsp; &nbsp;Objetivos</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:200%;font-size:15px;font-family:"Calibri",sans-serif;text-align:justify;'><span style="font-size:16px;line-height:200%;color:#0070C0;">&lt;&lt;Definir los objetivos planteados para el caso de estudio, para el planteamiento puede emplear t&eacute;cnicas para identificar objetivos (&aacute;rbol de objetivos). Listar la situaci&oacute;n esperada al resolver el problema, se expresa por la manifestaci&oacute;n contraria al problema identificado&gt;&gt;</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><em><span style="font-size:16px;line-height:107%;color:#C00000;">M&eacute;todo</span></em></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><span style="font-size:16px;line-height:107%;color:#C00000;">&nbsp; &nbsp;Identificaci&oacute;n de alternativas de soluci&oacute;n</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:200%;font-size:15px;font-family:"Calibri",sans-serif;'><span style="font-size:16px;line-height:200%;color:#0070C0;">&lt;&lt;Describir las soluciones espec&iacute;ficas por realizar: propuestas de soluci&oacute;n y especificaciones del caso de estudio&gt;&gt;</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:200%;font-size:15px;font-family:"Calibri",sans-serif;'><span style="font-size:16px;line-height:200%;color:#C00000;">&nbsp; &nbsp;An&aacute;lisis de las alternativas de soluci&oacute;n</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:200%;font-size:15px;font-family:"Calibri",sans-serif;text-align:justify;'><span style="font-size:16px;line-height:200%;color:#0070C0;">&lt;&lt;Determinar la viabilidad de las acciones que podr&iacute;an contribuir a concretar los medios fundamentales antes identificados, aplicando criterios apropiados y/requeridos para validar la viabilidad de la estrategia (pertinencia, factibilidad, disposici&oacute;n de recursos, etc.)&gt;&gt;</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><span style="font-size:16px;line-height:107%;color:#C00000;">&nbsp; Justificaci&oacute;n de la elecci&oacute;n de las alternativas</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><span style="font-size:16px;line-height:107%;color:#0070C0;">&lt;&lt;Descripci&oacute;n detallada y justificaci&oacute;n de la selecci&oacute;n de la alternativa con base al &iacute;tem anterior&gt;&gt;</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><span style="font-size:16px;line-height:107%;color:#0070C0;">&nbsp;</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><em><span style="font-size:16px;line-height:107%;color:#C00000;">Plan de acci&oacute;n</span></em></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:150%;font-size:15px;font-family:"Calibri",sans-serif;text-align:justify;'><span style="font-size:16px;line-height:150%;color:#0070C0;">&lt;&lt;Elaborar una planificaci&oacute;n que responda a la forma de solucionar los problemas principales, debe mantener relaci&oacute;n con los objetivos planteados y tomando en cuenta la viabilidad analizada&gt;&gt;</span></p>
    <p style='margin-top:0cm;margin-right:0cm;margin-bottom:8.0pt;margin-left:0cm;line-height:107%;font-size:15px;font-family:"Calibri",sans-serif;'><span style="font-size:16px;line-height:107%;color:#0070C0;">&nbsp;</span></p>`;
  }
  finalizarLeccion(): void {
    console.log(this.response);
    const formData: FormData = new FormData();
    formData.append('leccion', this.response.leccion.id);
    formData.append('aplica', this.response.aplica);
    formData.append('correctas', JSON.stringify(this.response.correctas));
    formData.append('correctasLength', this.response.correctas.length);
    formData.append('resUser', JSON.stringify(this.response.resUser));
    formData.append('totales', this.response.totales);
    formData.append('calificacionPreg', this.response.nota);
    formData.append('estudiante', this.factory.user.id);
    for (let i = 0; i < this.files.length; i++) {
      const file: File = this.files[i];
      formData.append('file' + i, file, file.name);
    }
    this.factory.post('leccion/registrarleccion', formData).subscribe(
      (response: any) => {
        this.toast.success(response.msg);
        this.router.navigate(['/dashboard/lesson/home']);
      },
      (error: any) => {
        this.toast.error('Prblema al registrar la leccion');
        console.log(error);
      }
    );
  }
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
    if (this.files[index].progress < 100) {
      console.log('Upload in progress.');
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number): void {
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
    this.factory
      .fileUpload('recursoEducativo/upload', this.files, this.leccion)
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
  prepareFilesList(files: Array<any>): void {
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
  formatBytes(bytes: any, decimals = 2): any {
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
