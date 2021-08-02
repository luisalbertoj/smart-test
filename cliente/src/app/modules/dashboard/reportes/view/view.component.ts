import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  CategoryScale,
  BarElement,
} from 'chart.js';

import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  BarController,
  CategoryScale,
  BarElement
);

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  @ViewChild('htmlData') htmlData:ElementRef;
  fileName = 'ExcelSheet.xlsx';
  plantilla: any = {
    imgBanner: 'assets/images/bannerReportes.png',
    tituloBanner: ''
    
  };
  grupos: any = [];
  consulta: any = {
    tipoReporte: '',
    fechaInicio: '',
    fechaFin: new Date().toISOString().split('T')[0],
    grupo: '',
  };
  reporte: any = {
    activo: false,
    data: [],
  };

  constructor(
    private factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadGrupos();
  }

  loadGrupos() {
    this.factory.getAll('grupo').subscribe(
      (response: any) => {
        this.grupos = response;
      },
      (error: any) => {
        this.toast.error(error.message);
        console.log(error);
      }
    );
  }

  generarReporte() {
    this.spinner.show();
    this.reporte = {
      activo: true,
      data: {
        headers: [
          'Codigo',
          'Nombre',
          'Grupo',
          'Lecciones completas',
          'Aciertos',
        ],
        body: [
          {
            codigo: '16132243',
            nombre: 'Luis Alberto Jaimes',
            grupo: '1A',
            completas: '22',
            aciertos: '90%',
          },
          {
            codigo: '16132244',
            nombre: 'Viviana Patiño Epalza',
            grupo: '1A',
            completas: '2',
            aciertos: '70%',
          },
          {
            codigo: '16132245',
            nombre: 'David Rivera Galvis',
            grupo: '1A',
            completas: '3',
            aciertos: '60%',
          },
          {
            codigo: '16132246',
            nombre: 'Yeimi lorena pachon',
            grupo: '1A',
            completas: '5',
            aciertos: '60%',
          },
          {
            codigo: '16132247',
            nombre: 'Marlyn dayana',
            grupo: '1A',
            completas: '2',
            aciertos: '60%',
          },
          {
            codigo: '16132248',
            nombre: 'Kevin chacon',
            grupo: '1A',
            completas: '14',
            aciertos: '60%',
          },
        ],
      },
    };
    this.graficar();
    setTimeout(() => {
      this.spinner.hide();
    }, 400);
  }
  graficar() {
    let myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [
          'Luis Alberto Jaimes',
          'Viviana Patiño Epalza',
          'David Rivera Galvis',
          'Yeimi lorena pachon',
          'Marlyn dayana',
          'Kevin chacon',
        ],
        datasets: [
          {
            label: 'Lecciones completas',
            data: [22, 2, 3, 5, 2, 14],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  generarExcel() {
    this.spinner.show();
    this.fileName = this.consulta.tipoReporte + this.consulta.fechaInicio + '&&' + this.consulta.fechaFin + '.xlsx'; 
    /* table id is passed over here */
    let element = document.getElementById('htmlData');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    setTimeout(() => {
      this.spinner.hide();
    }, 400);
  }

  public generarPdf():void {
    this.spinner.show();
    this.fileName = this.consulta.tipoReporte + this.consulta.fechaInicio + '&&' + this.consulta.fechaFin + '.pdf';
    let DATA = document.getElementById('htmlData');
      
    html2canvas(DATA).then(canvas => {
        
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save(this.fileName);
        setTimeout(() => {
          this.spinner.hide();
        }, 200);
    });     
  }
}
