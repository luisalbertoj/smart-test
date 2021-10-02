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
  @Output() selectElementos = new EventEmitter<[]>();

  public pageActual: any = 1;
  modelItems: any = [];

  memo: any = '';

  elementosSeleccionadas: any = [];

  constructor(private factory: FactoryService, private toast: ToastrService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    if (this.model !== this.memo) {
      this.memo = this.model;
      this.cargarModel();
    }
  }

  addNewItem(value: any): void {
    for (const [i, competencia] of this.elementosSeleccionadas.entries()) {
      if (competencia === value) {
        return this.elementosSeleccionadas.splice(i);
      }
    }
    this.elementosSeleccionadas.push(value);
    console.log(this.elementosSeleccionadas);
    this.selectElementos.emit(this.elementosSeleccionadas);
  }

  cargarModel(): any {
    if (this.model === '' || !this.model) {
      return this.toast.error('No se envío un modelo');
    }
    this.factory.getAll(this.model).subscribe((data) => {
      this.modelItems = data;
      console.log(data[0][this.bodyTable[0]]);
    });
  }
}
