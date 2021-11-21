import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { FactoryService } from 'src/app/services/factory.service'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  CategoryScale,
  BarElement
} from 'chart.js'

import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  CategoryScale,
  BarElement
)

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef
  fileName = 'ExcelSheet.xlsx'
  plantilla: any = {
    imgBanner: 'assets/images/bannerReportes.png',
    tituloBanner: ''
  }
  myChart: any
  grupos: any = []
  selectorCompetencia: any = {
    dataModel: null,
    config: {
      displayKey: 'nombre',
      searchOnKey: 'nombre',
      search: true,
      height: 'auto',
      placeholder: 'Todas las competencias',
      customComparator: () => { },
      limitTo: 0,
      moreText: '...',
      noResultsFound: 'No results found!',
      searchPlaceholder: 'Buscar',
      clearOnSelection: false,
      inputDirection: 'ltr'
    },
    dropdownOptions: []
  }
  selectorGrupo: any = {
    dataModel: null,
    config: {
      displayKey: 'codigo',
      searchOnKey: 'codigo',
      search: true,
      height: 'auto',
      placeholder: 'Seleccione los grupos',
      customComparator: () => { },
      limitTo: 0,
      moreText: '..',
      noResultsFound: 'No results found!',
      searchPlaceholder: 'Buscar',
      clearOnSelection: false,
      inputDirection: 'ltr'
    },
    dropdownOptions: []
  }
  competencias: any = []
  consulta: any = {
    tipoReporte: '',
    fechaInicio: '',
    fechaFin: new Date().toISOString().split('T')[0],
    grupo: ''
  }
  reporte: any = {
    activo: false,
    data: []
  }

  constructor(
    private factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadGrupos()
    this.loadCompetencias()
  }

  loadGrupos(): void {
    this.factory
      .getAll('grupo?populate=false&select=id,nombre,codigo')
      .subscribe(
        (response: any) => {
          this.grupos = response
          this.selectorGrupo.dropdownOptions = response
        },
        (error: any) => {
          this.toast.error(error.message)
          console.log(error)
        }
      )
  }
  loadCompetencias(): void {
    this.factory
      .getAll('competencia?populate=false&select=id,nombre')
      .subscribe(
        (response: any) => {
          this.competencias = response
          this.selectorCompetencia.dropdownOptions = response
        },
        (error: any) => {
          this.toast.error(error.message)
          console.log(error)
        }
      )
  }
  selectionCompetencia(competencias): void {
    console.log('Competencias seleccionadas', competencias)
  }
  selectionGrupo(grupos): void {
    console.log('Grupos seleccionados', grupos)
  }

  generarReporte(): any {
    if (!this.selectorGrupo.dataModel.id) {
      return this.toast.success('Debe seleccionar un grupo')
    }
    if (!this.consulta.fechaInicio) {
      return this.toast.success('Debe seleccionar la fecha de inicio')
    }
    this.spinner.show()
    console.log('Datos prev', this.consulta)
    this.factory
      .post('leccion/reporte', {
        fechaInicio: this.consulta.fechaInicio,
        fechaFin: this.consulta.fechaFin,
        competencias: this.selectorCompetencia.dataModel,
        grupos: this.selectorGrupo.dataModel
      })
      .subscribe((res: any) => {
        console.log('Reporte', res)
        this.reporte = {
          activo: true,
          data: {
            headers: [
              'Codigo',
              'Nombre',
              'Grupo',
              'Lecciones completas',
              'Media'
            ],
            body: []
          }
        }
        const grafica = {
          labels: [],
          datasets: [
            {
              label: 'Lecciones completas',
              data: [],
              borderWidth: 1
            }
          ]
        }

        if (res.data.length === 0) {
          this.spinner.hide()
          return this.toast.info('No hay datos')
        }

        res.data[0].personas.forEach((element) => {
          let suma = 0
          element.resultados.forEach((item) => {
            suma += item.calificacionAplica + item.calificacionPreg
          })
          /* if (element.resultados.leccion) { */
          this.reporte.data.body.push({
            codigo: element.codigo,
            nombre: element.nombre,
            grupo: res.data[0].nombre,
            completas: element.resultados.length,
            media: suma / element.resultados.length || 0
          })
          grafica.datasets[0].data.push(element.resultados.length)
          grafica.labels.push(element.nombre)
          /* } */
        })
        this.spinner.hide()
        this.graficar(grafica)
      })
  }
  graficar(grafica?): void {
    document.getElementById('gra').innerHTML += '<canvas id="myChart"></canvas>'

    this.myChart = new Chart('myChart', {
      type: 'bar',
      data: grafica,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
  generarExcel(): void {
    this.spinner.show()
    this.fileName =
      this.consulta.tipoReporte +
      this.consulta.fechaInicio +
      '&&' +
      this.consulta.fechaFin +
      '.xlsx'
    /* table id is passed over here */
    const element = document.getElementById('htmlData')
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    /* save to file */
    XLSX.writeFile(wb, this.fileName)
    setTimeout(() => {
      this.spinner.hide()
    }, 400)
  }

  public generarPdf(): void {
    this.spinner.show()
    this.fileName =
      this.consulta.tipoReporte +
      this.consulta.fechaInicio +
      '&&' +
      this.consulta.fechaFin +
      '.pdf'
    const DATA = document.getElementById('htmlData')

    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208
      const fileHeight = (canvas.height * fileWidth) / canvas.width

      const FILEURI = canvas.toDataURL('image/png')
      const PDF = new jsPDF('p', 'mm', 'a4')
      const position = 0
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save(this.fileName)
      setTimeout(() => {
        this.spinner.hide()
      }, 200)
    })
  }
}
