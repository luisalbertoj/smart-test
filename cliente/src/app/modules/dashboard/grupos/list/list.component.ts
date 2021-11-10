import { Component, OnInit } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { FactoryService } from 'src/app/services/factory.service'
import { environment } from 'src/environments/environment'
declare const $: any
declare interface DataTable {
  headerRow: string[]
  footerRow: string[]
  dataRows: any[][]
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  plantilla: any = {
    imgBanner: 'assets/images/banneruser.png'
  }
  env: any = environment.urlMedia
  public dataTable: DataTable
  public loader = true
  public usuarioSeleccionado: any = {}
  public grupoSeleccionado: any = {}
  public totalUsuarios = 0
  public docentes: any = []
  public tabla: any = {
    title: 'Docentes',
    model: 'persona',
    multiple: false,
    data: [],
    dataExist: [],
    header: [
      { name: 'Nombre' },
      { name: 'Apellido' },
      { name: 'Username' },
      { name: 'Acciones' }
    ],
    body: [{ name: 'nombre' }, { name: 'apellido' }, { name: 'username' }]
  }
  public estudiantes: any = []
  public tablaEs: any = {
    title: 'Estudiantes',
    model: 'personaEstudiante',
    multiple: true,
    data: [1, 2],
    grupo: [],
    header: [
      { name: 'Nombre' },
      { name: 'Apellido' },
      { name: 'Username' },
      { name: 'Acciones' }
    ],
    body: [{ name: 'nombre' }, { name: 'apellido' }, { name: 'username' }]
  }
  public lecciones: any = []
  public tablaLecc: any = {
    title: 'Lecciones',
    model: 'personaEstudiante',
    multiple: true,
    data: [1, 2],
    grupo: [],
    header: [
      { name: 'Nombre' },
      { name: 'Apellido' },
      { name: 'Username' },
      { name: 'Acciones' }
    ],
    body: [{ name: 'nombre' }, { name: 'apellido' }, { name: 'username' }]
  }
  constructor(
    private factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.factory.user.idRol.nombre === 'administrador') {
      this.loadGrupos(true)
    } else {
      this.loadGrupos()
    }
    this.loadDocentes()
    this.loadEstudiantes()
  }
  loadGrupos(isAdmin?): void {
    this.factory
      .getAll('grupo?populate=personas')
      .subscribe((response: any) => {
        this.toast.success('Grupos cargados')
        // console.log('Grupos', response);
        this.dataTable = {
          headerRow: ['Nombre', 'Codigo', 'Docente', 'Acciones'],
          footerRow: ['Nombre', 'Codigo', 'Docente', 'Acciones'],
          dataRows: []
        }
        this.dataTable.dataRows = response
        this.totalUsuarios = response.length
        this.loader = false
        setTimeout(() => {
          this.config()
          // console.log('se cumplio el intervalo');
        }, 500)
      })
  }
  config(): any {
    try {
      $('#datatables').DataTable({
        pagingType: 'full_numbers',
        lengthMenu: [
          [10, 25, 50, -1],
          [10, 25, 50, 'All']
        ],
        responsive: true,
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Buscar'
        }
      })

      const table = $('#datatables').DataTable()

      table.on('click', '.like', (e) => {
        alert('You clicked on Like button')
        e.preventDefault()
      })

      $('.card .material-datatables label').addClass('form-group')
    } catch (error) {}
  }
  actualizarDatos(): void {
    // console.log(this.grupoSeleccionado);
    this.grupoSeleccionado.docente =
      this.grupoSeleccionado.docente.id || this.grupoSeleccionado.docente
    const ids = []
    this.grupoSeleccionado.personas.forEach((element) => {
      ids.push(element.id || element)
    })
    this.grupoSeleccionado.personas = ids
    this.factory
      .put('grupo', this.grupoSeleccionado.id, this.grupoSeleccionado)
      .subscribe((res: any) => {
        this.toast.success('Datos actualizados')

        // console.log('Grupo actualzado', res);
      })
  }
  limpiarTablas(): any {
    this.tabla = {
      title: 'Docentes',
      model: 'persona',
      multiple: false,
      data: this.docentes,
      header: [
        { name: 'Nombre' },
        { name: 'Apellido' },
        { name: 'Username' },
        { name: 'Acciones' }
      ],
      body: [{ name: 'nombre' }, { name: 'apellido' }, { name: 'username' }]
    }
    this.tablaEs = {
      title: 'Estudiantes',
      model: 'personaEstudiante',
      multiple: true,
      data: this.estudiantes,
      header: [
        { name: 'Nombre' },
        { name: 'Apellido' },
        { name: 'Username' },
        { name: 'Acciones' }
      ],
      body: [{ name: 'nombre' }, { name: 'apellido' }, { name: 'username' }]
    }
  }
  seleccion(elemento, dato?): void {
    // console.log('Grupo seleccionado', elemento, dato);
    this.tabla.dataExist = dato
    this.tablaEs.dataExist = dato
    this.grupoSeleccionado = elemento
  }
  loadDocentes(): void {
    this.factory.getAll('rol?nombre=docente').subscribe((response: any) => {
      // console.log('RolDocente', response);
      if (!response.length) {
        return this.toast.error('No existe el rol de docentes en el sistema')
      }
      this.factory
        .getAll('persona?idRol=' + response[0].id)
        .subscribe((res: any) => {
          // console.log('Docentes', res);
          this.docentes = res
          this.tabla.data = this.docentes
        })
    })
  }
  loadEstudiantes(): void {
    this.factory.getAll('rol?nombre=estudiante').subscribe((response: any) => {
      // console.log('RolEstudiante', response);
      if (!response.length) {
        return this.toast.error('No existe el rol de estudiante en el sistema')
      }
      this.factory
        .getAll('persona?idRol=' + response[0].id)
        .subscribe((res: any) => {
          // console.log('Estudiantes', res);
          this.estudiantes = res
          this.tablaEs.data = this.estudiantes
        })
    })
  }
  selectDocente(item): void {
    if (item.length > 0) {
      this.grupoSeleccionado.docente = item[0]
      // console.log('List item', item);
      this.actualizarDatos()
    }
  }
  selectEstudiantes(items): void {
    this.grupoSeleccionado.personas = items
    console.log('List estudents', items)
    this.actualizarDatos()
  }
}
