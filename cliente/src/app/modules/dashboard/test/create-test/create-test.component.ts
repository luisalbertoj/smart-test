import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import { NgxSpinnerService } from 'ngx-spinner'; 

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {
  plantilla: any = {
    menuTest: 'Prueba de conocimiento',
    imgBanner: 'assets/images/bannercrearpruebas.png'
  };


  test: any = {
    nombre: '',
    observaciones: '',
    contenido: '',
    creador: JSON.parse(localStorage.getItem('user')).id || 1,
    inicio: '',
    cierre: '',
    grupo: JSON.parse(localStorage.getItem('user')).grupo?.nombre || 1,
    preguntas: []
  };
  
  public tipoPregunta: any = [];
  public tipoSelect: any = '';
  public items: any = [];
  public preguntas: any = [];
  public respuestas: any = [];
  public showbody = false;
  constructor(public factory: FactoryService,
    private toast: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   
    this.cargarTipos();
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
  onClickAccordion(key, value, truco?) {
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
        showbody:false
      });
      this.respuestas.push([]);
    }
    if (this.tipoSelect === 'abierta') {
      this.preguntas.push({ tipo: 'abierta', contenido: '' });
    }
  }

  agregarRespuesta(indice: any, pregunta?:any) {
    this.respuestas[indice].push({
      pregunta: indice,
      contenido: '',
      correcta: false,

    });
    pregunta.showbody=true;
  }

  aplicarSelect() {
    console.log(this.tipoSelect);
  }

  crearTest() {
    if (this.test.nombre === '')
      return this.toast.error('Debes llenar el nombre', 'error');
    if (this.test.observaciones === '')
      return this.toast.error('Debes llenar las observaciones', 'error');
    if (this.test.contenido === '')
      return this.toast.error('Debes llenar el contenido', 'error');
    if (this.test.inicio === '')
      return this.toast.error('Debes elegir el inicio', 'error');
    if (this.test.cierre === '')
      return this.toast.error('Debes elegir el cierre', 'error');
    if (this.preguntas?.length === 0)
      return this.toast.error('Debes llenar el practicar', 'error');
    console.log(this.test);
    this.spinner.show();
    this.factory
      .post('pruebaconocimiento/createtest', {
        test: this.test,
        preguntas: this.preguntas,
        respuestas: this.respuestas,
      })
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          this.toast.success('Prueba de conocimiento creada', 'Ok');
          setTimeout(() => {
            this.router.navigate(['dashboard/test']);
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
