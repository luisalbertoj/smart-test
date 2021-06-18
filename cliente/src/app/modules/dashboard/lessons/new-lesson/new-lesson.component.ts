import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.scss'],
})
export class NewLessonComponent implements OnInit {
  plantilla: any = {
    menuGeneral: 'Informacion general de la leccion',
    menuAprender: 'Aprender',
    menuPracticar: 'Practicar',
    menuAplicar: 'Aplicar',
    imgBanner: 'assets/images/bannercrearlecc.png'
  };

  leccion: any = {
    titulo: '',
    introduccion: '',
    observaciones: '',
    conclusiones: '',
    aprender: '',
    practicar: '',
    aplicar: '',
    slug: '',
    creador: JSON.parse(localStorage.getItem('user')).id || 1,
    competencias: [],
    preconceptos: [],
    objetivo: ''
  };
  public competencias: any = [];
  public preconceptos: any = [];
  public objetivos: any = [];
  public tipoPregunta: any = [];
  public tipoSelect: any = '';

  public preconSelec: any = [];
  public items: any = [];
  public itemsCompetencia: any = [];
  public preguntas: any = [];
  public respuestas: any = [];

  constructor(public factory: FactoryService,
    private toast: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.cargarCompetencias();
    this.cargarPreconceptos();
    this.cargarTipos();
    this.cargarObjetivos();
  }
  cargarObjetivos() {
    this.factory.getAll('objetivo').subscribe(
      (response: any) => {
        this.objetivos = response;
      },
      (error: any) =>
        this.toast.error(
          'Problema al cargar los Objetivos revisa la conexion',
          'Error de conexion'
        )
    );
  }
  cargarTipos() {
    this.factory.getAll('tipopregunta').subscribe(
      (response: any) => {
        this.tipoPregunta = response;
      },
      (error: any) =>
        this.toast.error(
          'Problema al cargar los tipos revisa la conexion',
          'Error de conexion'
        )
    );
  }
  cargarPreconceptos() {
    this.factory.getAll('preconcepto').subscribe(
      (response: any) => {
        this.preconceptos = response;
        for (const it of this.preconceptos) {
          /* if(it.slug.length > 20) it.slug = it.slug.substring(15, 30); */
          this.items.push(it.id + '⌂' +it.slug);
        }
      },
      (error: any) =>
        this.toast.error(
          'Problema al cargar los Preconceptos revisa la conexion',
          'Error de conexion'
        )
    );
  }
  cargarCompetencias() {
    this.factory.getAll('competencia').subscribe(
      (response: any) => {
        this.competencias = response;
        for (const it of this.competencias) {
          /* if(it.slug.length > 20) it.slug = it.slug.substring(15, 30); */
          this.itemsCompetencia.push(it.id + '⌂' +it.slug);
        }
      },
      (error: any) =>
        this.toast.error(
          'Problema al cargar las Competencias revisa la conexion',
          'Error de conexion'
        )
    );
  }
  onClickAccordion(key, value) {
    if (!value.showbody) {
      value.showbody = true;

      value.accordianclass = 'collapseAccordion';
    } else {
      value.showbody = false;

      value.accordianclass = 'expandAccordion';
    }
  }

  agregarPregunta() {
    if (
      this.tipoSelect === '' ||
      this.tipoSelect === null ||
      this.tipoSelect === 'Selecciona'
    ) {
      return this.toast.info('Primero selecciona un tipo de pregunta', 'Ops');
    }
    if (this.tipoSelect === 'multiple') {
      this.preguntas.push({
        tipo: 'multiple',
        contenido: '',
        respuestas: [{ contenido: '' }],
        respuestaCorrecta: '',
        showbody: false,
        accordianclass: 'collapseAccordion'
      });
      this.respuestas.push([]);
    }
    if (this.tipoSelect === 'abierta') {
      this.preguntas.push({ tipo: 'abierta', contenido: '' });
    }
  }

  agregarRespuesta(indice: any) {
    this.respuestas[indice].push({
      pregunta: indice,
      contenido: '',
      correcta: false,
    });
  }

  aplicarSelect() {
    console.log(this.tipoSelect);
  }

  crearLeccion() {
    if (this.leccion.titulo === '')
      return this.toast.error('Debes llenar el titulo', 'error');
    if (this.leccion.competencia === '')
      return this.toast.error('Debes elegir una competencia', 'error');
    if (this.leccion.introduccion === '')
      return this.toast.error('Debes llenar el introduccion', 'error');
    if (this.leccion.conclusiones === '')
      return this.toast.error('Debes llenar el conclusiones', 'error');
    if (this.leccion.aprender === '')
      return this.toast.error('Debes llenar el aprender', 'error');
    if (this.preguntas?.length === 0)
      return this.toast.error('Debes llenar el practicar', 'error');
    if (this.leccion.aplicar === '')
      return this.toast.error('Debes llenar el aplicar', 'error');
    console.log(this.leccion);
    this.spinner.show();
    this.factory
      .post('leccion/createlesson', {
        leccion: this.leccion,
        preguntas: this.preguntas,
        respuestas: this.respuestas,
      })
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          this.toast.success('Leccion creada', 'Ok');
          setTimeout(() => {
            this.router.navigate(['dashboard/lesson']);
          }, 500);
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          return this.toast.error(error.message, 'Problema en el servidor');
          
        }
      );
  }
}
