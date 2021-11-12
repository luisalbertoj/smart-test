import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { FactoryService } from 'src/app/services/factory.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  codigoRegistro: any = ''
  grupos: any = []

  public persona: any = {
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
    idRol: '2',
    grupos: ''
  }

  constructor(
    private factory: FactoryService,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.factory.loadUser()
    this.factory.user ? this.router.navigate(['dashboard']) : 0
    this.factory.returnAsObservable().subscribe((subs) => {
      subs === true ? this.spinner.hide() : this.spinner.show()
    })
    this.loadGrupos()
    this.loadRol()
  }
  loadRol() {
    this.factory
      .getAll(`rol?where={"nombre": {"contains": "estudiante"}}&populate=false`)
      .subscribe((arg) => {
        this.persona.idRol = arg[0].id
      })
  }
  loadGrupos(): any {
    this.factory.getAll('grupo').subscribe(
      (response: any) => {
        this.grupos = response
        this.grupos.forEach((grupo) => {
          grupo.codigoCrypt = this.factory.encryptData(grupo.codigo)
        })

        console.log('CODIGO ENCRIPTADO', this.grupos)
      },
      (error: any) => {
        this.toast.error(error.message)
        console.log(error)
      }
    )
  }

  registrar(): any {
    this.persona.grupos = ''
    const grupoRegistro = this.factory.decryptData(this.codigoRegistro)
    this.persona.grupos = []
    this.grupos.forEach((element) => {
      if (grupoRegistro === element.codigo) {
        this.persona.grupos.push(element.id)
      }
    })
    if (this.persona.grupos.length === 0) {
      return this.toast.info('Codigo de registro invalido')
    }
    if (this.persona.nombre === '') {
      return this.toast.error('Debes ingresar tu nombre')
    }
    if (this.persona.apellido === '') {
      return this.toast.error('Debes ingresar tu apellido')
    }
    if (this.persona.email === '') {
      return this.toast.error('Debes ingresar tu correo electronico')
    }
    if (this.persona.username === '') {
      return this.toast.error('Debes ingresar tu username')
    }
    if (this.persona.password === '') {
      return this.toast.error('Debes ingresar tu contraseña')
    }
    this.factory.post('persona/registrar', this.persona).subscribe(
      (response: any) => {
        this.toast.success('usuario creado')
        this.router.navigate(['auth'])
      },
      (error: any) => {
        console.log(error)
        this.toast.error(
          'Error al registrar el usuario: el nombre de usuario o el correo ya estan registrados'
        )
      }
    )
  }
}
