import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  public pageActual = 1;

  public resultLesson: any = [];
  plantilla: any = {
    menuTest: 'Resultados',
    imgBanner: 'assets/images/bannerResultados.png',
  };
  leccionCalificar: any = {};
  environment: any = environment;
  pagination: any = {
    length: 0,
    pageSize: 10,
    pageSizeOptions: [10, 25, 100],
    pageEvent: {},
    skip: 0,
    limit: 10,
  };
  filtroEstado: any;
  constructor(
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadResultLesson();
  }
  paginar(evt: any): void {
    this.pagination.pageEvent = evt;
    this.pagination.skip = this.pagination.pageEvent.pageIndex * 10;
    this.pagination.limit = this.pagination.pageEvent.pageSize;
    this.loadResultLesson();
  }

  loadResultLesson(): void {
    this.factory
      .post('resultLessonStudent/query', {
        where:
          this.filtroEstado !== null ? { estado: this.filtroEstado } : null,
        skip: this.pagination.skip,
        limit: this.pagination.limit,
        select: [
          'estado',
          'calificacionAplica',
          'calificacionPreg',
          'respuestasEstudiante',
          'respuestasCorrectas',
          'preguntasTotales',
          'aplicaEstudiante',
          'aplicaFile',
        ],
        populate: ['estudiante', 'leccion'],
        sort: 'createdAt DESC',
      })
      .subscribe((res: any) => {
        console.log('Datos query', res);
        this.pagination.length = res.count || 0;
        this.resultLesson = res.data;
      });
  }

  calificarSelected(item: any): void {
    this.leccionCalificar = item;
    console.log(item);
  }
  guardarCalificacion(): void {
    this.spinner.show();
    this.factory
      .put('resultLessonStudent', this.leccionCalificar.id, {
        calificacionAplica: this.leccionCalificar.calificacionAplica,
        estado: 1,
      })
      .subscribe(
        (res: any) => {
          this.toast.success('Nota registrada');
          console.log('Nota', res);
          this.loadResultLesson();
          this.spinner.hide();
        },
        (err: any) => {
          this.toast.error(err.message);
          console.log(err);
          this.spinner.hide();
        }
      );
  }
}
