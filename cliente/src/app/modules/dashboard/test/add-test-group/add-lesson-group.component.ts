import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-add-lesson-group',
  templateUrl: './add-lesson-group.component.html',
  styleUrls: ['./add-lesson-group.component.css'],
})
export class AddLessonGroupComponent implements OnInit {
  @Input() model: any;
  @Output() newLessons = new EventEmitter<any>();
  dataTable: any;
  displayedColumns: string[];
  busqueda: any;
  value: string;
  grupoLessonsOld: any;
  lecciones: any;
  constructor(private factory: FactoryService) {
    this.dataTable = [];
    this.displayedColumns = ['Titulo', 'Acciones'];
    this.busqueda = '';
    this.value = '';
    this.grupoLessonsOld = [];
    this.lecciones = [];
  }

  ngOnInit(): void {
    this.loadLessons();
  }

  public loadLessons(): void {
    this.lecciones = [];
    // // console.log('Model', this.model);
    this.factory
      .getAll(
        `leccion?where={"titulo":{"contains":"${this.busqueda.trim()}"}}&select=id,titulo&populate=grupos`
      )
      .subscribe((arg: any) => {
        // // console.log('Lecciones', arg);
        this.dataTable = arg;
        this.exist(this.grupoLessonsOld);
      });
  }
  public loadGrupo(): void {
    this.lecciones = [];
    this.factory
      .getAll(
        `grupo?where={"id":"${this.model.id}"}&select=id&populate=lecciones`
      )
      .subscribe((arg: any) => {
        this.grupoLessonsOld = arg;
        this.exist(this.grupoLessonsOld);
      });
  }

  exist(arg: any) {
    if (arg.length > 0) {
      arg[0].lecciones.forEach((element: any) => {
        this.dataTable.forEach((element2: any) => {
          if (element.id === element2.id) {
            element2.cheked = true;
            this.lecciones.push(element.id);
          }
        });
      });
      // console.log('Next verifid', this.dataTable);
    }
  }

  changeCheked(id: any): void {
    const i = this.lecciones.find((element: any, index: number): any => {
      if (element === id) {
        // console.log('dentro del array', element, index);
        return index + 1;
      }
    });
    if (i) {
      this.lecciones.splice(i - 1, 1);
    } else {
      this.lecciones.push(id);
    }
    // console.log('Elementos a guardar', this.lecciones);
    this.actualizarModel();
  }

  actualizarModel() {
    this.factory
      .put('grupo', this.model.id, { lecciones: this.lecciones })
      .subscribe((arg: any) => {
        console.log('Elementos enviados', this.lecciones);
        this.addNewItem(this.lecciones);
      });
  }

  addNewItem(value: any) {
    this.newLessons.emit(value);
  }

  /* loadLeccionesGrup() {
    this.model.lecciones = [];
    this.lecciones.forEach(element => {
      this.loadLessonsId(element);
    });
  }

  loadLessonsId(id: any): void {
    this.factory.getAll(`leccion?where={"id":"${id}"}&select=id,titulo&populate=objetivo`)
      .subscribe(arg =>  this.model.lecciones.push(arg[0]));

  }
 */
}
