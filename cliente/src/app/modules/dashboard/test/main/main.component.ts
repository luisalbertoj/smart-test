import { Component, OnInit } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { element } from 'protractor'
import { FactoryService } from 'src/app/services/factory.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public env = environment.urlMedia
  public editable = false
  public plantilla: any = {
    bannerImg: 'assets/images/bannercrearpruebas.png',
    bannerAlt: 'banner pruebas de conocimiento',
    bannerBoton: 'Nueva',
    bannerBotonIcono: 'fas fa-plus',
    botonTarjeta: '',
    botonTarjetaIcono: 'fas fa-arrow-right'
  }

  public tests: any = []
  public testEstudent: any = []
  pruebaCalificar: any = {}
  preguntaSeleccionada: any = {}
  respuestaSeleccionada: any = {}
  selectorGrupo: any = {
    dataModel: null,
    config: {
      displayKey: 'codigo',
      searchOnKey: 'codigo',
      search: true,
      height: 'auto',
      placeholder: 'Seleccione el grupo',
      customComparator: () => {},
      limitTo: 0,
      moreText: 'nombre',
      noResultsFound: 'No results found!',
      searchPlaceholder: 'Search',
      clearOnSelection: false,
      inputDirection: 'ltr'
    },
    dropdownOptions: []
  }
  constructor(
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    /* if (this.factory.user.idRol.nombre === 'estudiante') {
      // this.loadLessonsGroup()
      this.loadGruposEstudiante()
    }
    if (this.factory.user.idRol.nombre === 'docente') {
      this.loadGrupos()
    }
    if (this.factory.user.idRol.nombre === 'administrador') {
      this.loadAllGrupos()
    } */
    this.loadTests()
    this.loadPrivilegios()
  }

  loadGruposEstudiante() {
    const idUser = this.factory.user.id
    this.factory
      .getAll(`persona?where={"id":"${idUser}"}&populate=grupos`)
      .subscribe((res: any) => {
        // console.log('Grupos docente', res);
        this.selectorGrupo.dropdownOptions = res[0].grupos
      })
  }

  loadGrupos() {
    const idUser = this.factory.user.id
    this.factory
      .getAll(`persona?where={"id":"${idUser}"}&populate=gruposDocente`)
      .subscribe((res: any) => {
        // console.log('Grupos docente', res);
        this.selectorGrupo.dropdownOptions = res[0].gruposDocente
      })
  }

  loadAllGrupos() {
    this.factory
      .getAll(`grupo?select=id,codigo&populate=false`)
      .subscribe((res: any) => {
        // console.log('Grupos docente', res);
        this.selectorGrupo.dropdownOptions = res
      })
  }

  selectionChanged(evt: any): void {
    console.log(evt)
    if (evt.value) {
      this.selectorGrupo.select = true
      this.spinner.show()
      this.tests = []
      this.factory
        .getAll(
          `grupo?where={"id":"${evt.value.id}"}&select=id&populate=pruebas`
        )
        .subscribe((arg) => {
          arg[0].pruebas.forEach((element) => {
            this.loadTest(element.id)
          })
          this.loadResultTest()
          this.toast.success('pruebas cargadas')
        })
    } else {
      this.selectorGrupo.select = false
    }
  }

  loadTest(id?: string) {
    this.spinner.hide()
  }

  loadResultTest() {}

  loadTests(): any {
    if (this.factory.user.grupos > 0) {
      this.factory
        .getAll(
          `pruebaconocimiento?where={"grupo": "${this.factory.user.grupos[0].id}"}`
        )
        .subscribe((response: any) => {
          this.tests = response
          console.log('Tests Grupo', this.tests)
          this.loadTestEstudent()
        })
    }
  }
  loadTestEstudent(): void {
    this.factory
      .getAll('resultTestStudent?estudiante=' + this.factory.user.id)
      .subscribe((response: any) => {
        this.testEstudent = response
        this.testEstudent.forEach((test: any) => {
          // tslint:disable-next-line:no-shadowed-variable
          const found = this.tests.find((element: any): any => {
            if (element.id === test.prueba.id) {
              element.solved = test
              return true
            }
          })
          console.log('Encontrado', found)
        })
        console.log('Tests encontrados', this.tests)
      })
  }
  loadPrivilegios(): void {
    this.factory.user.idRol.privilegios.forEach((privilegio: any) => {
      if (privilegio.nombre === 'Editar pruebas') {
        this.editable = true
      }
    })
  }
  pruebaSelect(pruebaCalificar: any): void {
    this.pruebaCalificar = pruebaCalificar
    this.cargarPreguntas()
  }
  cargarPreguntas(): void {
    this.pruebaCalificar.respuestasEstudiante.forEach((respuestaP: any) => {
      this.factory
        .get('pregunta', respuestaP.pregunta)
        .subscribe((res: any) => {
          respuestaP.pregunta = res
        })
      this.factory
        .get('respuesta', respuestaP.respuestas)
        .subscribe((res: any) => {
          respuestaP.respuestas = res
        })
    })
  }
  seleccionarPregunta(
    pregunta: any,
    indice: number,
    respuestaEstudianteSelec: any
  ): any {
    this.preguntaSeleccionada = pregunta
    this.preguntaSeleccionada.indice = indice
    this.respuestaSeleccionada = respuestaEstudianteSelec
    console.log('preguntaa', this.preguntaSeleccionada)
    console.log('respuesta', this.respuestaSeleccionada)
  }
}
