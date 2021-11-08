import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  public resultLesson: any = [];
  plantilla: any = {
    menuTest: 'Resultados',
    imgBanner: 'assets/images/bannerResultados.png'
  };
  leccionCalificar: any = {};
  environment: any = environment;
  constructor(
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadResultLesson();
  }
  loadResultLesson(): void {
    this.factory.getAll('resultLessonStudent').subscribe(
      (res: any) => {
        console.log('Calificar', res);
        this.resultLesson = res;
      },
      (err: any) => {
        console.log(err);
        this.toast.error(err.msg);
      }
    );
  }

  calificarSelected(item: any): void {
    this.leccionCalificar = item;
    console.log(item);
  }
  guardarCalificacion(): void {
    this.spinner.show();
    this.factory.put('resultLessonStudent', this.leccionCalificar.id, {
      calificacionAplica: this.leccionCalificar.calificacionAplica,
      estado: 1
    }).subscribe(
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
