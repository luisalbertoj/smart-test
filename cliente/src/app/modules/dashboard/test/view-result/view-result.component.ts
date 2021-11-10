import { Component, OnInit } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { FactoryService } from 'src/app/services/factory.service'
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.css']
})
export class ViewResultComponent implements OnInit {
  public env = environment.urlMedia
  preguntaSeleccionada: any = {}
  respuestaSeleccionada: any = {}
  plantilla: any = {
    menuTest: 'Resultados',
    imgBanner: 'assets/images/bannerResultados.png'
  }

  public result = []
  pruebaCalificar: any = {}
  constructor(
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.factory.returnAsObservable().subscribe((subs) => {
      subs === true ? this.spinner.hide() : this.spinner.show()
    })
    this.loadTests()
  }

  loadTests(): any {
    this.factory.getAll('resultTestStudent').subscribe((response: any) => {
      this.result = response
      console.log(this.result)
    })
  }
  calificarSelected(item: any): any {
    this.pruebaCalificar = item
    this.pruebaCalificar.respuestasEstudiante.forEach(
      (resEs: any, i: number) => {
        this.loadPreguntas(resEs.pregunta, i)
        if (resEs.respuestas) {
          this.loadRespuestas(resEs.respuestas, i)
        }
      }
    )
    this.preguntaSeleccionada = {}
  }
  guardarCalificacion(): any {
    this.spinner.show()
    this.factory
      .put('respuestasEstudiante', this.respuestaSeleccionada.id, {
        calificacion: this.respuestaSeleccionada.calificacion,
        retroalimentacion: this.respuestaSeleccionada.retroalimentacion
      })
      .subscribe(
        (res: any) => {
          console.log('Calificacion', res)
          this.toast.success('Nota guardada')
          this.calcularCalificacion()
          this.spinner.hide()
        },
        (err: any) => {
          console.log('Error al guardar la calificacion', err)
          this.toast.error('No se pudo guardar la calificacion')
          this.spinner.hide()
        }
      )
  }
  calcularCalificacion(): any {
    console.log('Recalcular?', this.pruebaCalificar)
    let estado = 1
    let calificacion = 0
    this.pruebaCalificar.respuestasEstudiante.forEach((item: any) => {
      if (item.calificacion === '') {
        estado = 0
        return 0
      }
      // tslint:disable-next-line:radix
      calificacion += parseInt(item.calificacion)
    })
    if (estado !== 1) {
      return 0
    }
    this.factory
      .put('resultTestStudent', this.pruebaCalificar.id, {
        estado: 1,
        calificacion
      })
      .subscribe(
        (res: any) => {
          console.log('Nueva calificacion', res)
          this.toast.success('Estado actualizado')
          this.loadTests()
        },
        (err: any) => {
          console.log('Error al recalificar', err)
          this.toast.error('Error al guardar la calificacion')
        }
      )
  }
  loadRespuestas(id: number, i: number): any {
    this.factory.get('respuesta', id).subscribe(
      (res: any) => {
        console.log('Respuesta-' + id, res)
        this.pruebaCalificar.respuestasEstudiante[i].respuestas = res
      },
      (err: any) => {
        console.log('Respuesta-' + id, err)
      }
    )
  }
  loadPreguntas(id: number, i: any): any {
    this.factory.get('pregunta', id).subscribe(
      (res: any) => {
        console.log('Pregunta-' + id, res)
        this.pruebaCalificar.respuestasEstudiante[i].pregunta = res
      },
      (err: any) => {
        console.log('Pregunta-' + id, err)
      }
    )
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
  }
}
