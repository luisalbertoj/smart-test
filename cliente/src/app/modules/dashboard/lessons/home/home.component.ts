import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/services/course.service';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  plantilla: any = {
    imgBanner: 'assets/images/bannercrearlecc.png',
    tituloBanner: 'Lecciones ',
  };
  public leccion: any = this.course.get();
  public lecciones: any = [];
  public competencias: any = [];
  public modo: any = false;
  public editable = false;
  resultLesson: any = [];
  leccionCalificar: any = {};
  environment: any = environment;
  pruebaCalificar: any = {};

  constructor(
    private course: CourseService,
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.loadPrivilegios();
    this.loadLecciones();
    this.cargarCompetencias();
  }
  loadResultLesson(): void {
    this.factory.getAll('resultLessonStudent?estudiante=' + this.factory.user.id).subscribe(
      (res: any) => {
        this.resultLesson = res;
        this.resultLesson.forEach((lesson: any) => {
          // tslint:disable-next-line:no-shadowed-variable
          const found = this.lecciones.find((element: any): any => {
            if (element.id === lesson.leccion.id) {
              element.solved = lesson;
              return true;
            }
          });
          console.log('Encontrado', found);
        });
      },
      (err: any) => {
        console.log(err);
        this.toast.error(err.msg);
      }
    );
  }
  cargarCompetencias(): any {
    this.factory.getAll('competencia').subscribe(
      (response: any) => {
        this.competencias = response;
        for (const competencia of this.competencias) {
          competencia.showbody = false;
          competencia.accordianclass = 'collapseAccordion';
        }
        console.log(this.competencias);
        this.spinner.hide();
      },
      (error: any) => {
        this.toast.error(
          'Problema al cargar las Competencias revisa la conexion',
          'Error de conexion'
        );
        console.log('Error cargar competencias', error);
        this.spinner.hide();
      }
    );
  }
  loadLecciones(): any {
    this.factory.getAll('leccion').subscribe(
      (response: any) => {
        console.log(response);
        this.lecciones = response;
        this.loadResultLesson();
        this.toast.success('Lecciones cargadas');
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.toast.error('Problema en la red');
        this.spinner.hide();
      }
    );
  }
  iniciar(slug: any): any {
    this.router.navigate(['dashboard/lesson/lesson-detail', slug]);
  }
  onClickAccordion(key, value): any {
    if (!value.showbody) {
      value.showbody = true;

      value.accordianclass = 'collapseAccordion';
    } else {
      value.showbody = false;

      value.accordianclass = 'expandAccordion';
    }
  }
  loadPrivilegios(): void {
    this.factory.user.idRol.privilegios.forEach((privilegio: any) => {
        if (privilegio.nombre === 'Editar lecciones') {
          this.editable = true;
        }
    });
  }
  calificarSelected(item: any): void {
    this.leccionCalificar = item;
  }
}
