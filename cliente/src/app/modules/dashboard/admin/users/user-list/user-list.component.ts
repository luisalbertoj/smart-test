import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare const $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[][];
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  env: any = environment.urlMedia;
  plantilla: any = {
    imgBanner: 'assets/images/banneruser.png',
  };

  public pageActual = 1;

  public dataTable: DataTable;
  public usuarioSeleccionado: any = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: {},
  };
  public paqueteSeleccionado: any;
  // modelos inputs
  public contrasenaNueva = '';
  public correoNuevo = '';
  public puntosNuevos = 0;
  public datoBusqueda = '';
  public cabezaNueva = '';
  public paquete = '';

  public totalUsuarios = 0;
  public loader = true;
  public loaderBotones = false;
  public loadPuntos = false;
  public roles = [];

  constructor(private _factory: FactoryService) {}

  ngOnInit(): void {
    this.cargarTodos();
  }

  cargarTodos(): any {
    this._factory
      .post('persona/search', { populate: 'idRol', limit: 50, skip: 50 })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.dataTable = {
            headerRow: ['Nombre', 'Email', 'Rol', 'Acciones'],
            footerRow: ['Nombre', 'Email', 'Rol', 'Acciones'],
            dataRows: [],
          };
          this.dataTable.headerRow = ['Nombre', 'Email', 'Rol', 'Acciones'];
          this.dataTable.footerRow = ['Nombre', 'Email', 'Rol', 'Acciones'];
          this.dataTable.dataRows = response.data;
          this.totalUsuarios = response.count;
          this.loader = false;
          setTimeout(() => {
            this.config();
            console.log('se cumplio el intervalo');
          }, 500);
        },
        (error) => {
          console.log('Error', error);
        }
      );
    this.cargarRoles();
  }
  cargarRoles(): any {
    this._factory.getAll('rol').subscribe((response: any) => {
      this.roles = response;
      console.log('roles');
      console.log(this.roles);
    });
  }
  config(): any {
    try {
      $('#datatables').DataTable({
        pagingType: 'full_numbers',
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 25, 50, 'All'],
        ],
        responsive: true,
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Buscar',
        },
      });

      const table = $('#datatables').DataTable();

      table.on('click', '.like', (e) => {
        alert('You clicked on Like button');
        e.preventDefault();
      });

      $('.card .material-datatables label').addClass('form-group');
    } catch (error) {}
  }
  seleccion(row: any): any {
    this.usuarioSeleccionado = row;
    this.usuarioSeleccionado.idRol = this.usuarioSeleccionado.idRol.id || '0';
    console.log('Usuario', this.usuarioSeleccionado);
  }

  validarContrasena(): any {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}[^'\s]/;
    if (!regex.exec(this.contrasenaNueva)) {
      Swal.fire(
        'Oops',
        ` La Contraseña debe cumplir los siguientes parametros:
      -Minimo 8 caracteres
      -Maximo 15
      -Al menos una letra mayúscula
      -Al menos una letra minucula
      -Al menos un dígito
      -No espacios en blanco
      `,
        'error'
      );
      return false;
    } else {
      this.loaderBotones = true;
      this.usuarioSeleccionado.password = this.contrasenaNueva;
      return true;
    }
  }

  buscar(): any {
    this.loader = true;
    this.datoBusqueda = this.datoBusqueda.trim();
    if (this.datoBusqueda === '') {
      this.cargarTodos();
    } else {
      this._factory
        .post('user/search', {
          populate: ['cabeza', 'rol'],
          username: {
            startsWith: this.datoBusqueda,
          },
        })
        .subscribe(
          (response: any) => {
            this.dataTable.headerRow = ['Nombre', 'Email', 'Rol', 'Acciones'];
            this.dataTable.footerRow = ['Nombre', 'Email', 'Rol', 'Acciones'];
            this.dataTable.dataRows = response.data;
            this.loader = false;
          },
          (error) => {
            console.log('Error', error);
          }
        );
    }
  }

  validarCorreo(): any {
    const regex = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!regex.exec(this.correoNuevo)) {
      Swal.fire(
        'Oops',
        ` El correo debe cumplir los siguientes parametros:
      -Mayúsculas y minúsculas del alfabeto ingles.
      -Números de 0 al 9
      -puede contener punto pero no al inicio o repetirse.
      -puede usar los caracteres: !#$%&'*+-/=?^_{|}~
      `,
        'error'
      );
      return false;
    } else {
      this.loaderBotones = true;
      this.usuarioSeleccionado.email = this.correoNuevo;
      return true;
    }
  }

  actualizarDatos(): any {
    if (this.contrasenaNueva.trim() !== '' && this.contrasenaNueva !== '') {
      this.usuarioSeleccionado.password = this.contrasenaNueva;
    }
    if (this.correoNuevo.trim() !== '' && this.correoNuevo !== '') {
      this.usuarioSeleccionado.email = this.correoNuevo;
    }
    console.log('Usuario seleccionado', this.usuarioSeleccionado);
    const persona = this.usuarioSeleccionado;
    persona.idRol = this.usuarioSeleccionado.idRol;
    persona.newPassword = this.contrasenaNueva;
    console.log('actualizar');
    console.log(persona);
    this._factory.post('persona/actualizar', persona).subscribe(
      (response: any) => {
        console.log('respuesta de actualizar');
        console.log(response);
        Swal.fire('Ok', 'Usuario actualizado con exito', 'success');
        this.cargarTodos();
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
  cambiarRol(item): any {
    this.usuarioSeleccionado.idRol = item;
    console.log(this.usuarioSeleccionado);
  }
}
