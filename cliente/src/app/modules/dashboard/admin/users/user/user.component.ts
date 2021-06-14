import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';
import { txt } from 'src/app/util/strings';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public persona: any = {
    nombre : "",
    apellido: "",
    cedula: "",
    email: "",
    codigo: "",
    username: "",
    idRol:  {},
    password: ""
  };
  public txt = txt;
  test: Date = new Date();
  roles: any = [];
  constructor(private factory: FactoryService) {}
  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');
    this.cargarRoles();
  }
  ngOnDestroy(){
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
  }
  registro() {
    if (this.persona.nombre&&
      this.persona.apellido&&
      this.persona.codigo&&
      this.persona.idRol&&
      this.persona.email&&
      this.persona.password) {
        if(true) {
          var personaCrear = this.persona;
          personaCrear.idRol = this.persona.idRol.id;
          console.log("Persona a registrar");
          console.log(personaCrear);
          this.factory.post('persona/registrar', personaCrear).subscribe(
            (response: any) => {
              Swal.fire(
                'Ok',
                'Usuario registrado',
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
  cargarRoles() {
    this.factory.getAll('rol').subscribe(
      (response: any) => {
        this.roles = response;
        console.log("roles");
        console.log(this.roles);
      }
    )
  }
  cambiarRol(item) {
    this.persona.idRol = item;
    console.log(this.persona);
  }
}
