import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/services/course.service';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {
  public leccion: any = this.course.get();

  constructor(
    private course: CourseService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.factory.returnAsObservable().subscribe((subs: any) => {
      subs === true ? this.spinner.hide() : this.spinner.show();
    });
    if (this.factory.user.idRol.nombre === 'docente') {
      this.toast.error('No tienes permisos para hacer lecciones');
      this.router.navigate(['dashboard/lesson']);
    }

    const slug = this.activateRouter.snapshot.paramMap.get('slug');
    this.loadLeccion(slug);
  }
  loadLeccion(slug: any): void {
    this.factory.get('leccion', slug, 'slug').subscribe(
      (response: any) => {
        if (response.length > 0) {
          console.log(response);
          this.leccion = response[0];
        } else {
          this.toast.error('La leccion no se encontro');
          this.router.navigate(['dashboard/lesson']);
        }
      },
      (error: any) => {
        console.log(error);
        this.toast.error('Error al cargar la leccion');
        this.router.navigate(['dashboard/lesson']);
      }
    );
  }
}
