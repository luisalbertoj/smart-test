import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.scss'],
})
export class ViewTestComponent implements OnInit {
  public test = null;
  public respuestas = [];
  public duracion: any = 0;
  MILLISECONDS_OF_A_SECOND = 1000;
  MILLISECONDS_OF_A_MINUTE = this.MILLISECONDS_OF_A_SECOND * 60;
  MILLISECONDS_OF_A_HOUR = this.MILLISECONDS_OF_A_MINUTE * 60;
  MILLISECONDS_OF_A_DAY = this.MILLISECONDS_OF_A_HOUR * 24;
  SPAN_DAYS: any = 0;
  SPAN_HOURS: any = 0;
  SPAN_MINUTES: any = 0;
  SPAN_SECONDS: any = 0;
  DATE_TARGET: any = new Date('06/18/2021 0:01 AM');

  constructor(
    public factory: FactoryService,
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.factory.returnAsObservable().subscribe((subs) => {
      subs===true?this.spinner.hide():this.spinner.show();
    });
    this.loadTest();
  }

  loadTest() {
    this.factory
      .get('getprueba', this.rutaActiva.snapshot.params.id)
      .subscribe((response: any) => {
        if (response.status === 500) {
          Swal.fire('Ops', response.data, 'info');
        } else {
          this.test = response.data;
          console.log(this.test);
          const end: any = moment(this.test.cierre, "YYYY/MM/DD HH:mm:ss");
          const startTime: any = moment(this.test.inicio, "YYYY/MM/DD HH:mm:ss");
          this.duracion = moment.duration(end.diff(startTime, "YYYY/MM/DD HH:mm:ss"));
          console.log(this.duracion._milliseconds/ 60000);
          console.log(this.duracion);
          console.log(end, startTime);
          this.updateCountdown();
          setInterval(this.updateCountdown, this.MILLISECONDS_OF_A_SECOND);
        }
      });
  }

  respuestaSeleccionada(index, respuesta) {
    this.respuestas[index] = respuesta;
  }

  validarRespuestas() {
    let response = {
      correctas: [],
      totales: this.test.preguntas.length,
      resUser: this.respuestas,
      test: this.test,
    };
    for (let i = 0; i < this.respuestas.length; i++) {
      if (this.respuestas[i] == this.test.preguntas[i].respuestaCorrecta?.id) {

        response.correctas.push(this.test.preguntas[i]);
      }
    }
    localStorage.setItem('result', JSON.stringify(response));
    this.router.navigate(['dashboard/test/result']);
  }
  calcularTiempo() {
    
  }
  updateCountdown() {
    // Calcs
    const NOW: any = new Date()
    const DURATION = this.DATE_TARGET - NOW;
    const REMAINING_DAYS = Math.floor(DURATION / this.MILLISECONDS_OF_A_DAY);
    const REMAINING_HOURS = Math.floor((DURATION % this.MILLISECONDS_OF_A_DAY) / this.MILLISECONDS_OF_A_HOUR);
    const REMAINING_MINUTES = Math.floor((DURATION % this.MILLISECONDS_OF_A_HOUR) / this.MILLISECONDS_OF_A_MINUTE);
    const REMAINING_SECONDS = Math.floor((DURATION % this.MILLISECONDS_OF_A_MINUTE) / this.MILLISECONDS_OF_A_SECOND);

    // Render
    this.SPAN_DAYS = REMAINING_DAYS;
    this.SPAN_HOURS = REMAINING_HOURS;
    this.SPAN_MINUTES = REMAINING_MINUTES;
    this.SPAN_SECONDS = REMAINING_SECONDS;
}
}
