import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-privilegios',
  templateUrl: './privilegios.component.html',
  styleUrls: ['./privilegios.component.scss']
})
export class PrivilegiosComponent implements OnInit {
  public privilegios: any = [];
  public roles: any = [];
  public rolSeleccionado = "Seleccione un rol";
  idRol = "";


  constructor(private factory: FactoryService) { }

  ngOnInit(): void {
    this.cargarRoles();
    this.cargarPrivilegios();
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
  cargarPrivilegios() {
    this.factory.getAll('privilegio').subscribe(
      (response: any) => {
        console.log("privilegios");
        console.log(response);
        this.privilegios = response;
        for (let i = 0; i < this.privilegios.length; i++) {
          this.privilegios[i].checked = false;          
        }
      }
    );
  }
  cambiarRol(item) {
    console.log(item);
    this.rolSeleccionado = item.nombre;
    this.idRol = item.id;
    console.log("Roles");
    console.log(this.roles);
    this.factory.getAll('privilegio').subscribe(
      (response: any) => {
        console.log("privilegios");
        console.log(response);
        this.privilegios = response;
        for (let i = 0; i < item.privilegios.length; i++) {
          for (let y = 0; y < this.privilegios.length; y++) {
            if(item.privilegios[i]["nombre"] === this.privilegios[y].nombre) {
              this.privilegios[y].checked = true;
              console.log("entro");
            } else {
              this.privilegios[y].checked = false;
            }
          }             
        }
      }
    );
  }
  guardarPrivilegios() {
    console.log("envio a guardar");
    console.log(this.privilegios);
    var query = [];
    if(this.privilegios[0].checked == true) {
      query.push(this.privilegios[0].id);
    }
    if(this.privilegios[1].checked == false) {
      query.push(this.privilegios[1].id);
    }
    this.factory.post('privilegio/cambiarprivilegios', {idRol: this.idRol, privilegios: query}).subscribe(
      (response: any) => {
        console.log(response);
        Swal.fire('ok', 'Privilegios cambiados con exito', 'success')
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  cambiarEstado(item) {
    for (let y = 0; y < this.privilegios.length; y++) {
      if(item["nombre"] === this.privilegios[y].nombre) {
        this.privilegios[y].checked = !item.checked;
        console.log("cambio estado");
      }
    }   
  }
}
 