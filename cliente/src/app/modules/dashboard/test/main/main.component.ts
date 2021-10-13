import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { element } from 'protractor';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public env = environment.urlMedia;
  public editable = false;
  public plantilla: any = {
    bannerImg: 'assets/images/bannercrearpruebas.png',
    bannerAlt: 'banner pruebas de conocimiento',
    bannerBoton: 'Nueva',
    bannerBotonIcono: 'fas fa-plus',
    botonTarjeta: '',
    botonTarjetaIcono: 'fas fa-arrow-right',
  };

  public tests: any = [];
  public testEstudent: any = [];
  pruebaCalificar: any = {};
  preguntaSeleccionada: any = {};
  respuestaSeleccionada: any = {};

  constructor(
    public factory: FactoryService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadTests();
    this.loadPrivilegios();
  }

  loadTests(): any {
    this.factory.getAll('pruebaconocimiento').subscribe((response: any) => {
      this.tests = response;
      console.log('Tests', this.tests);
      this.loadTestEstudent();
    });
  }
  loadTestEstudent(): void {
    this.factory.getAll('resultTestStudent?estudiante=' + this.factory.user.id)
    .subscribe((response: any) => {
      this.testEstudent = response;
      this.testEstudent.forEach((test: any) => {
        // tslint:disable-next-line:no-shadowed-variable
        const found = this.tests.find((element: any): any => {
          if (element.id === test.prueba.id) {
            element.solved = test;
            return true;
          }
        });
        console.log('Encontrado', found);
      });
      console.log('Tests encontrados', this.tests);
    });
  }
  loadPrivilegios(): void {
    this.factory.user.idRol.privilegios.forEach((privilegio: any) => {
        if (privilegio.nombre === 'Editar pruebas') {
          this.editable = true;
        }
    });
  }
  pruebaSelect(pruebaCalificar: any): void {
    this.pruebaCalificar = pruebaCalificar;
    this.cargarPreguntas();
  }
  cargarPreguntas(): void {
    this.pruebaCalificar.respuestasEstudiante.forEach((respuestaP: any) => {
      this.factory.get('pregunta', respuestaP.pregunta).subscribe(
        (res: any) => respuestaP.pregunta = res
      );
      this.factory.get('respuesta', respuestaP.respuestas).subscribe(
        (res: any) => respuestaP.respuestas = res
      );
    });
  }
  seleccionarPregunta(
    pregunta: any,
    indice: number,
    respuestaEstudianteSelec: any
  ): any {
    this.preguntaSeleccionada = pregunta;
    this.preguntaSeleccionada.indice = indice;
    this.respuestaSeleccionada = respuestaEstudianteSelec;
    console.log('preguntaa', this.preguntaSeleccionada);
    console.log('respuesta', this.respuestaSeleccionada);
  }
}
