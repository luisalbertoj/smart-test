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

  @Output() textContent = new EventEmitter<String>();
  @Input() arrayModel: any = new FormArray([]);
  @Input() labels = '';
  constructor(private factory: FactoryService, private toast: ToastrService) { }

  ngOnInit(): void {    
  }

  ngDoCheck() {
  }
  create() {
    return console.log(this.arrayModel);
    
    this.factory.post(this.model, {}).subscribe(
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
