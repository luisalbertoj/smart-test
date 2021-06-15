import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';


@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.scss']
})
export class NewLessonComponent implements OnInit {

  plantilla: any = {
    menuGeneral: 'Informacion general de la leccion',
    menuAprender: 'Aprender',
    menuPracticar: 'Practicar',
    menuAplicar: 'Aplicar'
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
    creador: '',

  };
  public competencias: any = [];
  public preconceptos: any = [];
  public tipoPregunta: any = [];
  public tipoSelect: any = 'Selecciona';

  public preconSelec: any = [];
  public items: any = [];
  public preguntas: any = [];
  public respuestas: any = [];

  constructor(public factory: FactoryService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.cargarCompetencias();
    this.cargarPreconceptos();
    this.cargarTipos();
  }
  cargarTipos() {
    this.factory.getAll('tipopregunta').subscribe(
      (response: any) => {
        this.tipoPregunta = response;
      },
      (error: any) => this.toast.error('Problema al cargar los tipos revisa la conexion', 'Error de conexion')
    );
  }  
  cargarPreconceptos() {
    this.factory.getAll('preconcepto').subscribe(
      (response: any) => {
        this.preconceptos = response
        for (const it of this.preconceptos) {
          this.items.push(it.slug);
        }
        console.log(this.preconceptos);
      },
      (error: any) => this.toast.error('Problema al cargar los Preconceptos revisa la conexion', 'Error de conexion')
    );
  }
  cargarCompetencias() {
    this.factory.getAll('competencia').subscribe(
      (response: any) => {
        this.competencias = response
        console.log(this.competencias);
      },
      (error: any) => this.toast.error('Problema al cargar las Competencias revisa la conexion', 'Error de conexion')
    );
  }

  agregarPregunta() {
    if(this.tipoSelect === '' || this.tipoSelect === null || this.tipoSelect === 'Selecciona') {
      return this.toast.info('Primero selecciona un tipo de pregunta', 'Ops');
    }
    if(this.tipoSelect === 'multiple') {
      this.preguntas.push({tipo: 'multiple', contenido: '', respuestas: [{contenido: ''}], respuestaCorrecta: ''});
      this.respuestas.push([]);
    }
    if(this.tipoSelect === 'abierta') {
      this.preguntas.push({tipo: 'abierta', contenido: ''});
    }
  }

  agregarRespuesta(indice: any) { 
    this.respuestas[indice].push({pregunta: indice, contenido: ''});
  }
}
