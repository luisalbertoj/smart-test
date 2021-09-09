import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';

declare var $: any;

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
    duracion: '',
    grupo: JSON.parse(localStorage.getItem('user')).grupo?.nombre || 1,
    preguntas: []
  };

  public tipoPregunta: any = [];
  public tipoSelect: any = '';
  public items: any = [];
  public preguntas: any = [];
  public respuestas: any = [];
  respuesta: any;
  public showbody = false;
  public iconStatus = [false, false, false, false];
  id: any;

  constructor(public factory: FactoryService,
    private toast: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const slug = this.activateRouter.snapshot.paramMap.get('slug');
    this.id = slug;
    if (slug) this.loadTest();
    $('[data-toggle="tooltip"]').tooltip();
    this.factory.returnAsObservable().subscribe((subs) => {
      subs === true ? this.spinner.hide() : this.spinner.show();
    });
    this.cargarTipos();
  }

  loadTest() {
    this.factory.query('pruebaconocimiento/getprueba', { where: { id: this.id } }).subscribe((res: any) => {
      console.log(res);
      this.test = res.data;
      this.preguntas = _.map(this.test.preguntas, (item: any) => {
        return {
          ...item,
          tipo: item.tipo.slug,
          tipos: item.tipo,
          respuestaCorrecta: item.respuestaCorrecta.contenido,
          respuestas: [{ contenido: '' }],
          respuestaCorrectas: item.respuestaCorrecta,
        }
      });
      this.iconStatus[0] = !this.iconStatus[0];
      console.log(this.test, this.preguntas)
      this.respuestas.push([]);
    });
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
        showbody: false,
        accordianclass: 'expandAccordion'
      });
    }
    if (this.tipoSelect === 'abierta') {
      this.preguntas.push({ tipo: 'abierta', contenido: '' });

    }
    this.respuestas.push([]);
  }

  eliminarPregunta(indice: any) {
    this.preguntas.splice(indice);

  }
  agregarRespuesta(indice: any, pregunta?: any) {
    this.respuestas[indice].push({
      pregunta: indice,
      contenido: '',
      correcta: false,
      addRetro: false,
      retroalimentacion: ''
    });
    pregunta.showbody = true;
    console.log(indice, pregunta, this.respuestas)
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
    if (this.test.duracion === '')
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

  eliminarRespuesta(ev: any, idx: number) {
    this.preguntas = this.preguntas.filter(((item: any) => item.pregunta == ev.pregunta));
    for (let index = 0; index < this.respuestas.length; index++) {
      const element = this.respuestas[index];
      this.respuestas[element] = this.respuestas[element].filter(((item: any) => item.pregunta == idx));
    }
    console.log(ev, this.respuestas, this.preguntas)
  }

  editarTest() {
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
    if (this.test.duracion === '')
      return this.toast.error('Debes elegir el cierre', 'error');
    if (this.preguntas?.length === 0)
      return this.toast.error('Debes llenar el practicar', 'error');
    console.log(this.test);
    this.spinner.show();
    this.factory
      .post('pruebaconocimiento/updatetest', {
        test: this.test,
        id: this.id,
        preguntas: this.preguntas,
        respuestas: this.respuestas,
      })
      .subscribe(
        (response: any) => {
          this.spinner.hide();
          this.toast.success('Prueba de conocimiento Actualizada', 'Ok');
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          return this.toast.error(error.message, 'Problema en el servidor');

        }
      );
  }
}
