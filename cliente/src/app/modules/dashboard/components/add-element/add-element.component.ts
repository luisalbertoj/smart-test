import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.css']
})
export class AddElementComponent implements OnInit {

  
  @Input() title: string = '';
  @Input() model: string = '';
  @Input() labels = '';
  @Input() mer: any = {};
  elementsModel = new FormGroup({
    arrayModel: new FormArray([])
  });
  arrayModel = this.elementsModel.get("arrayModel") as FormArray;
  
  constructor(private factory: FactoryService, private toast: ToastrService) { }

  ngOnInit(): void {
  }
 
  ngDoCheck() {
  }

  addArray(datos: any) {
    for (const dato of datos) {
      this.arrayModel.push(dato);
    }
  }

  create() {
    let datos = {};
    console.log(this.model);
    datos = (this.model === 'competencia') ? 
    ({nombre: this.arrayModel.value[0], observaciones: this.arrayModel.value[1], creador:  this.factory.user.id}) : datos;
    if(datos === {}) return this.toast.error("El modelo de datos no esta definido");
    this.factory.post(this.model, datos).subscribe(
      (response: any) => {
        this.toast.success("Elemento creado correctamente");
        console.log(response);
      },
      (error: any) => {
        this.toast.error(error.message);
        console.log(error);
      }
    )
  }

}
