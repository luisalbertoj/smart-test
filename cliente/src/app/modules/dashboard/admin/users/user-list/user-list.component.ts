import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2'
declare const $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[][];
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public dataTable: DataTable;
  public usuarioSeleccionado: any = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    rol: {}
  };
  public paqueteSeleccionado: any;
  // modelos inputs
  public contrasenaNueva: string = "";
  public correoNuevo: string = "";
  public puntosNuevos = 0;
  public datoBusqueda = '';
  public cabezaNueva = '';
  public paquete = '';

  public totalUsuarios = 0;
  public loader = true;
  public loaderBotones = false;
  public loadPuntos = false;
  public roles = [];

  constructor(private _factory: FactoryService) { }

  ngOnInit(): void {
    this.cargarTodos();
  }

  cargarTodos() {
    this._factory.post('persona/search', {populate: 'idRol', limit: 50, skip: 50 }).subscribe(
      (response: any) => {
        console.log(response);
        this.dataTable = {
          headerRow: ['Nombre', 'Email', 'Rol', 'Acciones'],
          footerRow: ['Nombre', 'Email', 'Rol', 'Acciones'],
          dataRows: []
        };
        this.dataTable.headerRow = ['Nombre', 'Email', 'Rol', 'Acciones'];
        this.dataTable.footerRow = ['Nombre', 'Email', 'Rol', 'Acciones'];
        this.dataTable.dataRows = response.data;
        this.totalUsuarios = response.count;
        this.loader = false;
        setTimeout(() => {
          this.config();
          console.log("se cumplio el intervalo");
        }, 500);
      },
      error => {
        console.log('Error', error);
      });
      this.cargarRoles();
  }
  cargarRoles() {
    this._factory.getAll('rol').subscribe(
      (response: any) => {
        this.roles = response;
        console.log("roles");
        console.log(this.roles);
      }
    )
  }
  config() {
    $('#datatables').DataTable({
      "pagingType": "full_numbers",
      "lengthMenu": [
        [10, 25, 50, -1],
        [10, 25, 50, "All"]
      ],
      responsive: true,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
      }

    });

    const table = $('#datatables').DataTable();

    table.on('click', '.like', function (e) {
      alert('You clicked on Like button');
      e.preventDefault();
    });

    $('.card .material-datatables label').addClass('form-group');
  }
  seleccion(row: any) {
    this.usuarioSeleccionado = row;
  }
  
  validarContrasena() {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,15}[^'\s]/;
    if (!regex.exec(this.contrasenaNueva)) {
      Swal.fire('Oops', ` La Contraseña debe cumplir los siguientes parametros: 
      -Minimo 8 caracteres
      -Maximo 15
      -Al menos una letra mayúscula
      -Al menos una letra minucula
      -Al menos un dígito
      -No espacios en blanco
      ` , 'error');
      return false;
    } else {
      this.loaderBotones = true;
      this.usuarioSeleccionado.password = this.contrasenaNueva;
      return true;
    }
  }
  
  buscar() {
    this.loader = true;
    this.datoBusqueda = this.datoBusqueda.trim();
    if (this.datoBusqueda === '') {
      this.cargarTodos();
    } else {
      this._factory
        .post('user/search', {
          populate: ['cabeza', 'rol'],
          username: {
            'startsWith': this.datoBusqueda
          }
        }).subscribe(
          (response: any) => {
            this.dataTable.headerRow = ['Nombre', 'Email', 'Rol', 'Acciones'];
            this.dataTable.footerRow = ['Nombre', 'Email', 'Rol', 'Acciones'];
            this.dataTable.dataRows = response.data;
            this.loader = false;
          },
          error => {
            console.log('Error', error);
          });
    }
  }

  validarCorreo() {
    const regex = /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    if (!regex.exec(this.correoNuevo)) {
      Swal.fire('Oops', ` El correo debe cumplir los siguientes parametros: 
      -Mayúsculas y minúsculas del alfabeto ingles.
      -Números de 0 al 9
      -puede contener punto pero no al inicio o repetirse.
      -puede usar los caracteres: !#$%&'*+-/=?^_{|}~
      ` , 'error');
      return false;
    } else {
      this.loaderBotones = true;
      this.usuarioSeleccionado.email = this.correoNuevo;
      return true;
    }
  }

  actualizarDatos() {
    if (this.contrasenaNueva.trim() !== '') {
      this.usuarioSeleccionado.password = this.contrasenaNueva;
    }
    if (this.correoNuevo.trim() !== '') {
      this.usuarioSeleccionado.email = this.correoNuevo;
    }
    console.log(this.usuarioSeleccionado);
    let persona = this.usuarioSeleccionado;
    persona.idRol = this.usuarioSeleccionado.idRol.id;
    console.log("actualizar");
    console.log(persona);
    this._factory.post('persona/actualizar', persona)
    .subscribe(
      (response: any) => {
        console.log("respuesta de actualizar");
        console.log(response);
        Swal.fire('Ok', 'Usuario actualizado con exito', 'success');
        this.cargarTodos();
      },
      error => {
        console.log('Error', error);
      });
  }
  cambiarRol(item) {
    this.usuarioSeleccionado.idRol = item;
    console.log(this.usuarioSeleccionado);
  }

}