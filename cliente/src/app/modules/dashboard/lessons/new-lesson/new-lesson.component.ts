import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';


@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.scss']
})
export class NewLessonComponent implements OnInit {

  plantilla: any = {
    menu1: 'Informacion general de la leccion'
  };

  leccion: any = {
    titulo: '',
    introduccion: '',
    observaciones: '',
    conclusiones: '',
    aprender: '',
    practicar: '',
    aplicar: '',
    slug: '',
    creador: '',

  };
  public competencias: any = [];
  public preconceptos: any = [];
  public preconSelec: any = [];
  public items: any = [];

  constructor(public factory: FactoryService) { }

  ngOnInit(): void {
    this.cargarCompetencias();
    this.cargarPreconceptos();

  }
  cargarPreconceptos() {
    this.factory.getAll('preconcepto').subscribe(
      (response: any) => {
        this.preconceptos = response
        for (const it of this.preconceptos) {
          this.items.push(it.slug);
        }
        console.log(this.preconceptos);
      }
    );
  }
  cargarCompetencias() {
    this.factory.getAll('competencia').subscribe(
      (response: any) => {
        this.competencias = response
        console.log(this.competencias);
      }
    );
  }

}
