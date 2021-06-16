import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public leccion: any = this.course.get();
  public competencias: any = [];

  constructor(
    private course: CourseService,
    public factory: FactoryService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarCompetencias();
  }

  cargarCompetencias() {
    this.factory.getAll('competencia').subscribe(
      (response: any) => {
        this.competencias = response;
        for (let competencia of this.competencias) {
          competencia.showbody = false;
          competencia.accordianclass = 'collapseAccordion';
        }
        console.log(this.competencias);
      },
      (error: any) =>
        this.toast.error(
          'Problema al cargar las Competencias revisa la conexion',
          'Error de conexion'
        )
    );
  }

  onClickAccordion(key, value) {
    if (!value.showbody) {
      value.showbody = true;

      value.accordianclass = 'collapseAccordion';
    } else {
      value.showbody = false;

      value.accordianclass = 'expandAccordion';
    }
  }
}
