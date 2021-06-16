import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/services/course.service';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public leccion: any = this.course.get();
  public lecciones: any = [];
  
  constructor(private course: CourseService,
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.factory.returnAsObservable().subscribe((subs) => {
      subs===true?this.spinner.hide():this.spinner.show();
    });
    this.loadLecciones();
  }

  loadLecciones() {
    this.factory.getAll('leccion').subscribe(
      (response: any) => {
        console.log(response);
        this.lecciones = response;
        this.toast.success('Lecciones cargadas');
      },
      (error: any) => {
        console.log(error);
        this.toast.error('Problema en la red');
      }
    );
  }

}
