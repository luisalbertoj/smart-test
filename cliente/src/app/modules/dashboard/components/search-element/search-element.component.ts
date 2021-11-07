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
    // console.log('Value', value);
    // console.log('Table', this.table);
    console.log('Elementos seleccionados antes', this.elementosSeleccionadas);
    if (this.table.multiple) {

      let find = true;
      for (const [i, element] of this.elementosSeleccionadas.entries()) {
        // // console.log('Elements compare', element, value);
        if (element === value) {
          find = false;  
          this.elementosSeleccionadas.splice(i, 1);
          // console.log('Encontrado', this.elementosSeleccionadas);
        }
      }
      if(find) {
        this.elementosSeleccionadas.push(value);
      }
      // console.log('Elementos seleccionados', this.elementosSeleccionadas);
      
    } else {
      this.elementosSeleccionadas = [value];
      // console.log(this.elementosSeleccionadas);
    }
    this.selectElementos.emit(this.elementosSeleccionadas);
  }

  cargarModel(table?:any, ): any {
    if(table) { 
      
      this.table = table;
      console.log('Tabla', this.table);
      this.elementosSeleccionadas = [];
    }
    if (this.model === '' || !this.model) {
      return this.toast.error('No se envío un modelo');
    }
    this.modelItems = [];
    // console.log('Datos enviados', this.table);
    if (this.table?.data && this.table?.data.length) {
      if (this.table.multiple) {
        // console.log('multiple mayor', this.table.dataExist);
        this.table.dataExist.forEach((item: any) => {
          this.table.data.forEach((item2: any) => {
            if (item.id === item2.id) {
              // console.log('multiple', item.username);
              item2.checked = true;
              this.elementosSeleccionadas.push(item.id);
            } else {
              item2.checked = false;
            }
          });
        });
      } else {
        // console.log('unico mayor', this.table.dataExist);
        this.table.data.forEach((item1: any) => {
          if (item1.id === this.table.dataExist.id) {
            // console.log('unico', item1.username);
            item1.checked = true;
          }
        });
      }
      // console.log('Datos finales', this.table.data);
      return (this.modelItems = this.table.data);
    }
    this.factory.getAll(this.model).subscribe((data) => {
      // console.log('Datos', data);
      // console.log('body table', this.bodyTable);
      this.modelItems = data;
    });
  }

  public clear() {
    this.title = '';
    this.model = '';
    this.headerTable = [];
    this.bodyTable = [];
    this.table = {};

    this.pageActual = 1;
    this.modelItems = [];
    this.memo = '';
    this.elementosSeleccionadas = [];
    console.log('Limpio');
    
  }



}
