import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/services/course.service';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  plantilla: any = {
    imgBanner: 'assets/images/imgLaboratorio.png',
    tituloBanner: 'Lecciones ',
  };
  public leccion: any = this.course.get();
  public lecciones: any = [];
  public competencias: any = [];
  public modo: any = false;

  constructor(
    private course: CourseService,
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.loadLecciones();
    this.cargarCompetencias();
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
}
