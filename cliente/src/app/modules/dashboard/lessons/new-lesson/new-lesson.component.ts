import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { FactoryService } from 'src/app/services/factory.service'
import { NgxSpinnerService } from 'ngx-spinner'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util'
import Swal from 'sweetalert2'

declare let $: any

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.scss']
})
export class NewLessonComponent implements OnInit {
  tablaCompetencias: any = {
    header: [{ name: 'Competencia' }, { name: 'Autor' }, { name: 'Acciones' }],

    body: [{ name: 'nombre' }, { name: 'creador', attribute: 'nombre' }]
  }

  tablaPreconceptos: any = {
    title: 'Preconceptos',
    model: 'preconcepto',
    multiple: true,
    data: [],
    dataExist: [],
    header: [
      { name: 'Preconcepto' },
      { name: 'Definición' },
      { name: 'Acciones' }
    ],

    body: [{ name: 'titulo' }, { name: 'concepto' }]
  }

  tablaPreguntas: any = {
    header: [{ name: 'Pregunta' }, { name: 'Acciones' }],

    body: [{ name: 'contenido' }]
  }

  newCompetencia: any = {
    arrayForm: [
      new FormControl('', Validators.required),
      new FormControl('', Validators.required)
    ],
    labels: ['Nombre', 'Observaciones'],
    model: 'competencia',
    title: 'Agregar Competencia'
  }

  newPreconcepto: any = {
    arrayForm: [
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
      new FormControl('', Validators.required)
    ],
    labels: ['Preconcepto', 'Defición', 'Fuente'],
    model: 'preconcepto',
    title: 'Agregar Preconcepto'
  }

  newObjetivo: any = {
    arrayForm: [
      new FormControl('', Validators.required),
      new FormControl('', Validators.required)
    ],
    labels: ['Titulo', 'Objetivo'],
    model: 'objetivo',
    title: 'Agregar Objetivo'
  }

  plantilla: any = {
    menuGeneral: 'Informacion general de la leccion',
    menuAprender: 'Aprender',
    menuPracticar: 'Practicar',
    menuAplicar: 'Aplicar',
    imgBanner: 'assets/images/bannercrearlecc.png'
  }

  leccion: any = {
    titulo: '',
    introduccion: '',
    observaciones: '',
    conclusiones: '',
    aprender: '',
    practicar: '',
    aplicar: '',
    slug: '',
    creador: JSON.parse(localStorage.getItem('user')).id,
    competencias: [],
    preconceptos: [],
    objetivo: ''
  }

  selectorObjetivo: any = {
    dataModel: null,
    config: {
      displayKey: 'contenido',
      searchOnKey: 'contenido',
      search: true,
      height: 'auto',
      placeholder: 'Seleccione el objetivo',
      customComparator: () => {},
      limitTo: 0,
      moreText: '..',
      noResultsFound: 'No results found!',
      searchPlaceholder: 'Buscar',
      clearOnSelection: false,
      inputDirection: 'ltr'
    },
    dropdownOptions: []
  }
  selectorCompetencias: any = {
    dataModel: null,
    config: {
      displayKey: 'nombre',
      searchOnKey: 'nombre',
      search: true,
      height: 'auto',
      placeholder: 'Seleccione las competencias',
      customComparator: () => {},
      limitTo: 0,
      moreText: '..',
      noResultsFound: 'No results found!',
      searchPlaceholder: 'Buscar',
      clearOnSelection: false,
      inputDirection: 'ltr'
    },
    dropdownOptions: []
  }
  selectorPreconceptos: any = {
    dataModel: null,
    config: {
      displayKey: 'titulo',
      searchOnKey: 'titulo',
      search: true,
      height: 'auto',
      placeholder: 'Seleccione los preconceptos',
      customComparator: () => {},
      limitTo: 0,
      moreText: '..',
      noResultsFound: 'No results found!',
      searchPlaceholder: 'Buscar',
      clearOnSelection: false,
      inputDirection: 'ltr'
    },
    dropdownOptions: []
  }
  public competencias: any = []
  public preconceptos: any = []
  public objetivos: any = []
  public tipoPregunta: any = []
  public tipoSelect: any = ''

  public preconSelec: any = []
  public items: any = []
  public itemsCompetencia: any = []
  public preguntas: any = []
  public respuestas: any = []
  public iconStatus = [false, false, false, false]

  id: any
  disableBtn = false

  constructor(
    public factory: FactoryService,
    private toast: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const slug = this.activateRouter.snapshot.paramMap.get('slug')
    if (slug) {
      this.loadLeccion(slug)
    }
    this.id = slug
    $('[data-toggle="tooltip"]').tooltip()
    this.cargarCompetencias()
    this.cargarPreconceptos()
    this.cargarTipos()
    this.cargarObjetivos()
  }

  loadLeccion(slug): void {
    this.spinner.show()
    this.factory.get('getleccion', slug).subscribe((response: any) => {
      if (response.status === 500) {
        Swal.fire('Ops', response.data, 'info')
      } else {
        this.renderData(response)
      }
    })
  }
  renderData(response: any): void {
    this.leccion = response.data
    this.selectorPreconceptos.dataModel = this.leccion.preconceptos
    /* this.leccion.preconceptos.forEach((element, i) => {
      this.leccion.preconceptos[i] = element.slug
    }) */
    this.selectorCompetencias.dataModel = this.leccion.competencias
    /* this.leccion.competencias.forEach((element, i) => {
      this.leccion.competencias[i] = element.slug
    }) */
    this.selectorObjetivo.dataModel = this.leccion.objetivo
    this.leccion.practicar.forEach((pregunta, i) => {
      pregunta.showbody = true
      pregunta.accordianclass = 'collapseAccordion'
      pregunta.tipo = pregunta.tipo.slug
      this.preguntas.push(pregunta)
      if (pregunta.respuestas.length > 0) {
        pregunta.respuestas.forEach((respuesta) => {
          if (respuesta.retroalimentacion !== '') {
            respuesta.addRetro = true
          }
        })
        console.log(pregunta.respuestas)
        for (const key of pregunta.respuestas) {
          if (key.contenido === 'true') {
            key.correcta = key.contenido
          }
        }
        this.respuestas.push(pregunta.respuestas)
      } else {
        this.respuestas.push([])
      }
    })
    this.tipoSelect = 'estudio'
    setInterval(() => {
      this.spinner.hide()
    }, 400)
  }

  selectCompetencias(dato): void {
    this.leccion.competencias = dato
  }

  selectPreconceptos(dato): void {
    console.log(
      this.tablaPreconceptos.header,
      this.tablaPreconceptos.body,
      dato
    )
    this.leccion.preconceptos = dato
  }

  selectPreguntas(dato): void {
    this.leccion.preguntas = dato
  }

  cargarObjetivos(evt?): void {
    this.factory
      .getAll('objetivo?populate=false&select=id,titulo,contenido')
      .subscribe(
        (response: any) => {
          console.log('Objetivos', response)
          this.objetivos = response[0]
          this.selectorObjetivo.dropdownOptions = response
        },
        (error: any) =>
          this.toast.error(
            'Problema al cargar los Objetivos revisa la conexion',
            'Error de conexion'
          )
      )
  }
  cargarTipos(): void {
    this.factory.getAll('tipopregunta').subscribe(
      (response: any) => {
        this.tipoPregunta = response
      },
      (error: any) => {
        this.toast.error(
          'Problema al cargar los tipos revisa la conexion',
          'Error de conexion'
        )
      }
    )
  }
  cargarPreconceptos(): void {
    this.factory
      .getAll('preconcepto?populate=false&select=id,titulo')
      .subscribe(
        (response: any) => {
          this.selectorPreconceptos.dropdownOptions = response
          // this.preconceptos = response
          /* for (const it of this.preconceptos) {
            // if(it.slug.length > 20) it.slug = it.slug.substring(15, 30);
            this.items.push('⌂' + it.slug)
          } */
        },
        (error: any) =>
          this.toast.error(
            'Problema al cargar los Preconceptos revisa la conexion',
            'Error de conexion'
          )
      )
  }
  cargarCompetencias(evento?): void {
    this.factory
      .getAll('competencia?populate=false&select=id,nombre')
      .subscribe(
        (response: any) => {
          // this.competencias = response
          this.selectorCompetencias.dropdownOptions = response
          /* for (const it of this.competencias) {
            // if(it.slug.length > 20) it.slug = it.slug.substring(15, 30);
            this.itemsCompetencia.push('⌂' + it.slug)
          } */
        },
        (error: any) =>
          this.toast.error(
            'Problema al cargar las Competencias revisa la conexion',
            'Error de conexion'
          )
      )
  }
  onClickAccordion(key, value): void {
    if (!value.showbody) {
      value.showbody = true

      value.accordianclass = 'collapseAccordion'
    } else {
      value.showbody = false

      value.accordianclass = 'expandAccordion'
    }
  }

  agregarPregunta(): any {
    if (
      this.tipoSelect === '' ||
      this.tipoSelect === null ||
      this.tipoSelect === 'Selecciona'
    ) {
      return this.toast.info('Primero selecciona un tipo de pregunta', 'Ops')
    }
    if (this.tipoSelect === 'multiple') {
      this.preguntas.push({
        tipo: 'multiple',
        contenido: '',
        respuestas: [{ contenido: '' }],
        respuestaCorrecta: '',
        showbody: false,
        accordianclass: 'collapseAccordion'
      })
    }
    if (this.tipoSelect === 'abierta') {
      this.preguntas.push({ tipo: 'abierta', contenido: '' })
    }
    this.respuestas.push([])
  }

  eliminarPregunta(indice: any): any {
    const temporal = []
    for (let index = 0; index < this.preguntas.length; index++) {
      if (index !== indice) {
        temporal.push(this.preguntas[index])
      }
    }

    this.preguntas = temporal
  }

  agregarRespuesta(indice: any): any {
    this.respuestas[indice].push({
      pregunta: indice,
      contenido: '',
      correcta: false,
      addRetro: false,
      retroalimentacion: ''
    })
  }

  eliminarRespuesta(hijo: any, padre: any): any {
    const temporal = []
    this.respuestas[padre].forEach((element, i) => {
      if (i !== hijo) {
        temporal.push(element)
      }
    })
    this.respuestas[padre] = temporal
  }

  aplicarSelect(): any {}

  crearLeccion(): any {
    console.log('Lesson of crate', this.leccion)
    if (this.leccion.titulo === '') {
      return this.toast.error('Debes llenar el titulo', 'error')
    }
    if (this.leccion.competencia === '') {
      return this.toast.error('Debes elegir una competencia', 'error')
    }
    if (this.leccion.introduccion === '') {
      return this.toast.error('Debes llenar el introduccion', 'error')
    }
    if (this.leccion.conclusiones === '') {
      return this.toast.error('Debes llenar el conclusiones', 'error')
    }
    if (this.leccion.aprender === '') {
      return this.toast.error('Debes llenar el aprender', 'error')
    }
    if (this.preguntas?.length === 0) {
      return this.toast.error('Debes llenar el practicar', 'error')
    }
    if (this.leccion.aplicar === '') {
      return this.toast.error('Debes llenar el aplicar', 'error')
    }
    this.spinner.show()
    if (this.leccion.slug !== '') {
      return this.actualizar()
    }
    this.crear()
  }
  crear(): any {
    this.leccion.objetivo = this.selectorObjetivo.dataModel.id
    this.leccion.competencias = this.selectorCompetencias.dataModel
    this.leccion.preconceptos = this.selectorPreconceptos.dataModel
    this.leccion.aplicaPractico = JSON.stringify({
      aceptacion: this.leccion.aceptacion,
      pruebas: this.leccion.pruebas,
      unidad: this.leccion.unidad
    })
    this.factory
      .post('leccion/createlesson', {
        leccion: this.leccion,
        preguntas: this.preguntas,
        respuestas: this.respuestas
      })
      .subscribe(
        (response: any) => {
          this.spinner.hide()
          this.toast.success('Leccion creada', 'Ok')
          setTimeout(() => {
            this.router.navigate(['dashboard/lesson'])
          }, 500)
        },
        (error: any) => {
          console.log(error)
          this.spinner.hide()
          return this.toast.error(error.message, 'Problema en el servidor')
        }
      )
  }

  editarLeccion(): any {
    if (this.disableBtn) {
      return false
    }
    this.disableBtn = true
    this.factory
      .post('leccion/updatelesson', {
        id: this.leccion.id,
        leccion: this.leccion,
        preguntas: this.preguntas,
        respuestas: this.respuestas
      })
      .subscribe(
        (res: any) => {
          console.log(res)
          this.spinner.hide()
          this.toast.success('Leccion Actualizada', 'Ok')
          this.disableBtn = false
        },
        (error: any) => {
          console.log(error)
          this.spinner.hide()
          this.disableBtn = false
          return this.toast.error(error.message, 'Problema en el servidor')
        }
      )
  }

  actualizar(): any {
    this.toast.info('incoming')
  }
}
