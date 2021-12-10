import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-privilegios',
  templateUrl: './privilegios.component.html',
  styleUrls: ['./privilegios.component.scss'],
})
export class PrivilegiosComponent implements OnInit {
  public privilegios: any = [];
  public roles: any = [];
  public rolSeleccionado = 'Seleccione un rol';
  item: any = {};

  plantilla: any = {
    imgBanner: 'assets/images/privilegio.png',
  };

  constructor(
    private factory: FactoryService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.cargarRoles();
  }
  cargarRoles(id?: any): any {
    this.factory.getAll(id ? 'rol/' + id : 'rol').subscribe((response: any) => {
      if (id) {
        this.item = response;
        this.cambiarRol(this.item);
        console.log('cargo cambios', response);
      } else {
        this.roles = response;
      }
      console.log('roles', this.roles);
    });
  }
  cargarPrivilegios(): any {
    this.factory.getAll('privilegio').subscribe((response: any) => {
      console.log('privilegios');
      console.log(response);
      this.privilegios = response;
    });
  }
  cambiarRol(item: any): any {
    this.rolSeleccionado = item.nombre;
    this.item = item;
    this.factory.getAll('privilegio').subscribe((response: any) => {
      this.privilegios = response;
      this.item.privilegios.forEach((itemPrivilegio: any) => {
        this.privilegios.forEach((privilegio: any) => {
          if (itemPrivilegio.nombre === privilegio.nombre) {
            privilegio.checked = true;
          }
        });
      });
    });
  }
  guardarPrivilegios(): any {
    this.spinner.show();
    const query: any = [];
    this.privilegios.forEach((privilegio: any) => {
      if (privilegio.checked === true) {
        query.push(privilegio.id);
      }
    });
    this.factory
      .post('privilegio/cambiarprivilegios', {
        idRol: this.item.id,
        privilegios: query,
      })
      .subscribe(
        (response: any) => {
          console.log('Respuesta de guardar', response);
          this.cargarRoles(this.item.id);
          this.spinner.hide();
          Swal.fire('ok', 'Privilegios cambiados con exito', 'success');
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
