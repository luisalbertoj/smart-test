import { Component, OnInit, Input, DoCheck, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';


@Component({
  selector: 'app-search-element',
  templateUrl: './search-element.component.html',
  styleUrls: ['./search-element.component.css']
})
export class SearchElementComponent implements OnInit, DoCheck {

  @Input() title: string = '';
  @Input() model: string = '';
  @Input() headerTable: any = [];
  @Input() bodyTable: any = [];
  @Output() selectElementos = new EventEmitter<[]>();

  modelItems: any = [];

  memo: string = '';

  elementosSeleccionadas: any = [];

  constructor(private factory: FactoryService, private toast: ToastrService) { }

  ngOnInit(): void {
  
  }

  ngDoCheck() {
    if(this.model!=this.memo) {
      this.memo = this.model;
      this.cargarModel(); 
    }
  }

  addNewItem(value: any) {
    for (const [i,competencia] of this.elementosSeleccionadas.entries()) {
      if(competencia===value) {
        return this.elementosSeleccionadas.splice(i);
      }
    }
    this.elementosSeleccionadas.push(value);
    console.log(this.elementosSeleccionadas);
    this.selectElementos.emit(this.elementosSeleccionadas);
    
  }

  cargarModel() {
    if (this.model==="" || !this.model) return this.toast.error("No se envío un modelo");
    this.factory.getAll(this.model).subscribe(data => {
      this.modelItems=data;
      console.log(data[0][this.bodyTable[0]]);
    });
  }
}
