import { Component, OnInit, OnDestroy } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { FactoryService } from 'src/app/services/factory.service';
import { txt } from 'src/app/util/strings';
import { validations } from 'src/app/util/validations';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
    public persona = {
      nombre : "",
      email: "",
      password: ""
    };
    public txt = txt;
    test: Date = new Date();
    constructor(private factory: FactoryService) {}
    ngOnInit() {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('register-page');
      body.classList.add('off-canvas-sidebar');
    }
    ngOnDestroy(){
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('register-page');
      body.classList.remove('off-canvas-sidebar');
    }

    registro() {
      if (this.persona.nombre&&
        this.persona.email&&
        this.persona.password) {
          if(true) {
            this.factory.post('persona', this.persona).subscribe(
              (response: any) => {
                Swal.fire(
                  'Ok',
                  'Bienvenid@: ' + response.nombre,
                  'success'
                );
                console.log(response);
              },
              (error: any) => {
                Swal.fire(
                  'Error',
                  'Ocurrio un eror al ejecutar la accion: ' + error.message,
                  'error'
                );
                console.log(error);
              }
            );
          } else {
            Swal.fire(
              'Error',
              'El formulario no se ha llenado correctamente ',
              'error'
            );
          }
        } else {
          Swal.fire(
            'Error',
            'El formulario no esta completo ',
            'error'
          );
        }
    }

}
