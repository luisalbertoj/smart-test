import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { CourseService } from 'src/app/services/course.service'
import { FactoryService } from 'src/app/services/factory.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  plantilla: any = {
    imgBanner: 'assets/images/bannercrearlecc.png',
    tituloBanner: 'Lecciones '
  }
  public leccion: any = this.course.get()
  public lecciones: any = []
  public competencias: any = []
  public modo: any = false
  public editable = false
  resultLesson: any = []
  leccionCalificar: any = {}
  environment: any = environment
  pruebaCalificar: any = {}
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
    private course: CourseService,
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show()
    // console.log('Usuario', this.factory.user);
    if (this.factory.user.idRol.nombre === 'estudiante') {
      // this.loadLessonsGroup()
      this.loadGruposEstudiante()
    }
    if (this.factory.user.idRol.nombre === 'docente') {
      this.loadGrupos()
    }
    if (this.factory.user.idRol.nombre === 'administrador') {
      this.loadAllGrupos()
    }
    this.loadPrivilegios()
    //this.loadLecciones();
    this.cargarCompetencias()
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
  addLessonGrup() {}

  selectionChanged(evt: any): void {
    console.log(evt)
    if (evt.value) {
      this.selectorGrupo.select = true
      this.spinner.show()
      this.lecciones = []
      this.factory
        .getAll(
          `grupo?where={"id":"${evt.value.id}"}&select=id&populate=lecciones`
        )
        .subscribe((arg) => {
          arg[0].lecciones.forEach((element) => {
            this.loadLesson(element.id)
          })
          this.loadResultLesson()
          this.toast.success('Lecciones cargadas')
        })
    } else {
      this.selectorGrupo.select = false
    }
  }

  loadResultLesson(): void {
    this.factory
      .getAll('resultLessonStudent?estudiante=' + this.factory.user.id)
      .subscribe(
        (res: any) => {
          this.resultLesson = res
          this.resultLesson.forEach((lesson: any) => {
            // tslint:disable-next-line:no-shadowed-variable
            const found = this.lecciones.find((element: any): any => {
              if (element.id === lesson.leccion.id) {
                element.solved = lesson
                return true
              }
            })
            // console.log('Encontrado', found);
          })
          this.spinner.hide()
        },
        (err: any) => {
          console.log(err)
          this.toast.error(err.msg)
          this.spinner.hide()
        }
      )
  }
  cargarCompetencias(): any {
    this.factory
      .getAll('competencia?select=id,nombre&populate=lecciones')
      .subscribe(
        (response: any) => {
          this.competencias = response
          for (const competencia of this.competencias) {
            competencia.showbody = false
            competencia.accordianclass = 'collapseAccordion'
          }
          console.log(this.competencias)
        },
        (error: any) => {
          this.toast.error(
            'Problema al cargar las Competencias revisa la conexion',
            'Error de conexion'
          )
          console.log('Error cargar competencias', error)
        }
      )
  }
  loadLecciones(): any {
    this.lecciones = []
    this.factory
      .getAll(`leccion?select=id,slug,titulo&populate=objetivo`)
      .subscribe(
        (response: any) => {
          console.log(response)
          this.lecciones = response
          this.loadResultLesson()
          this.toast.success('Lecciones cargadas')
          this.spinner.hide()
        },
        (error: any) => {
          console.log(error)
          this.toast.error('Problema en la red')
          this.spinner.hide()
        }
      )
  }

  loadLesson(id: string): any {
    this.factory
      .getAll(
        `leccion?where={"id":"${id}"}&populate=objetivo&select=id,titulo,slug`
      )
      .subscribe(
        (response: any) => {
          this.lecciones.push(response[0])
          // this.loadResultLesson();
        },
        (error: any) => {
          console.log(error)
          this.toast.error('Problema en la red')
          this.spinner.hide()
        }
      )
  }

  loadNewLessons(items) {
    this.spinner.show()
    this.lecciones = []
    // console.log('Items', items.length, items);
    items.forEach((element) => {
      this.loadLesson(element)
    })
    this.toast.success('Lecciones cargadas')
    this.spinner.hide()
  }

  loadLessonsGroup() {
    this.spinner.show()
    const grupoUser = this.factory.user.grupos[0]
    this.factory
      .getAll(`grupo?id=${grupoUser.id}&populate=lecciones&select=id,codigo`)
      .subscribe(
        (response: any) => {
          // console.log('lecciones por grupo', response);
          response[0].lecciones.forEach((element) => {
            this.loadLesson(element.id)
          })
          this.loadResultLesson()
          this.toast.success('Lecciones cargadas')
          this.spinner.hide()
        },
        (error: any) => {
          // console.log(error);
          this.toast.error('Problema en la red')
          this.spinner.hide()
        }
      )
  }

  iniciar(slug: any): any {
    this.router.navigate(['dashboard/lesson/lesson-detail', slug])
  }
  onClickAccordion(key, value): any {
    if (!value.showbody) {
      value.showbody = true

      value.accordianclass = 'collapseAccordion'
    } else {
      value.showbody = false

      value.accordianclass = 'expandAccordion'
    }
  }
  loadPrivilegios(): void {
    this.factory.user.idRol.privilegios.forEach((privilegio: any) => {
      if (privilegio.nombre === 'Editar lecciones') {
        this.editable = true
      }
    })
  }
  calificarSelected(item: any): void {
    this.leccionCalificar = item
  }
}
