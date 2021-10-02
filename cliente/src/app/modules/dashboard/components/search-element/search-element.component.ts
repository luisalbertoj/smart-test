import {
  Component,
  OnInit,
  Input,
  DoCheck,
  Output,
  EventEmitter,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-search-element',
  templateUrl: './search-element.component.html',
  styleUrls: ['./search-element.component.css'],
})
export class SearchElementComponent implements OnInit, DoCheck {
  @Input() title: any = '';
  @Input() model: any = '';
  @Input() headerTable: any = [];
  @Input() bodyTable: any = [];
  @Input() table: any = {};
  @Output() selectElementos = new EventEmitter<[]>();

  public pageActual: any = 1;
  modelItems: any = [];

  memo: any = '';

  elementosSeleccionadas: any = [];

  constructor(private factory: FactoryService, private toast: ToastrService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    /* if (this.model !== this.memo) {
      this.memo = this.model;
      this.cargarModel();
    } */
  }

  addNewItem(value: any): void {
    if (this.table.multiple) {
      for (const [i, competencia] of this.elementosSeleccionadas.entries()) {
        if (competencia === value) {
          return this.elementosSeleccionadas.splice(i);
        }
      }
      this.elementosSeleccionadas.push(value);
      console.log(this.elementosSeleccionadas);
      this.selectElementos.emit(this.elementosSeleccionadas);
    } else {
      this.elementosSeleccionadas = [value];
      console.log(this.elementosSeleccionadas);
      this.selectElementos.emit(this.elementosSeleccionadas);
    }
  }

  cargarModel(): any {
    if (this.model === '' || !this.model) {
      return this.toast.error('No se envío un modelo');
    }
    this.modelItems = [];
    console.log('Datos enviados', this.table);
    if (this.table?.data && this.table?.data.length) {
      if (this.table.multiple) {
        console.log('multiple mayor', this.table.dataExist);
        this.table.dataExist.forEach((item: any) => {
          this.table.data.forEach((item2: any) => {
            if (item.id === item2.id) {
              console.log('multiple', item.username);
              item2.checked = true;
            }
          });
        });
      } else {
        console.log('unico mayor', this.table.dataExist);
        this.table.data.forEach((item1: any) => {
          if (item1.id === this.table.dataExist.id) {
            console.log('unico', item1.username);
            item1.checked = true;
          }
        });
      }
      console.log('Datos finales', this.table.data);
      return (this.modelItems = this.table.data);
    }
    this.factory.getAll(this.model).subscribe((data) => {
      console.log('Datos', data);
      console.log('body table', this.bodyTable);
      this.modelItems = data;
    });
  }



}
