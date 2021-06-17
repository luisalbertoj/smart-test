import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lesson-view',
  templateUrl: './lesson-view.component.html',
  styleUrls: ['./lesson-view.component.css'],
})
export class LessonViewComponent implements OnInit {
  public leccion: any = [];
  public respuestas: any = [];
  public response: any = {
    correctas: [],
    totales: 0,
    resUser: this.respuestas,
    leccion: this.leccion,
    aplica: ''
  };

  constructor(
    private router: Router,
    private activateRouter: ActivatedRoute,
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.factory.returnAsObservable().subscribe((subs) => {
      subs === true ? this.spinner.hide() : this.spinner.show();
    });
    const slug = this.activateRouter.snapshot.paramMap.get('slug');
    this.loadLeccion(slug);
  }
  loadLeccion(slug) {
    this.factory
      .get('getleccion', slug)
      .subscribe((response: any) => {
        if (response.status === 500) {
          Swal.fire('Ops', response.data, 'info');
        } else {
          this.leccion = response.data;
          console.log(this.leccion);
        }
      });
  }

  respuestaSeleccionada(index, respuesta) {
    this.respuestas[index] = respuesta;
  }

  validarRespuestas() {
    this.response = {
      correctas: [],
      totales: this.leccion.practicar.length,
      resUser: this.respuestas,
      leccion: this.leccion,
    };
    for (let i = 0; i < this.respuestas.length; i++) {
      if (this.respuestas[i] == this.leccion.practicar[i].respuestacorrecta) {
        this.response.correctas.push(this.leccion.practicar[i]);
      }
    }
    localStorage.setItem('result', JSON.stringify(this.response));
  }
  finalizarLeccion() {
    
  }
}
