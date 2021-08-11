import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  

  data: any = {
    lecciones: '10',
    tests: '4',
    laboratorios: '5',
    rendimiento: 90,
  };

  grupos: any = [];
  consulta: any = {
    grupo: '',
  };

  codeEncrypt: any = this.consulta.grupo;

  persona: any = {
    nombre: '',
    apellido: '',
    cedula: '',
    email: '',
    codigo: '',
    username: '',
    password: '',
    photo: ''
  };



  readonly = true;
  public env = environment.urlMedia;

  content = 'Hello, i am tiny text and copied from somewhere else';
  
  constructor(public factory: FactoryService, private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,  private clipboardApi: ClipboardService) { }

  ngOnInit(): void {
    this.loadGrupos();
    this.persona = this.factory.user;
  }

  copyText() {
    this.clipboardApi.copyFromContent(this.content)
  }


  loadGrupos() {
    this.factory.getAll('grupo').subscribe(
      (response: any) => {
        this.grupos = response;
      },
      (error: any) => {
        this.toast.error(error.message);
        console.log(error);
      }
    );
  }

  habilitar() {

    //habilitar
    this.readonly = false;
  }

  desabilitar() {

    //deshabilitar
    this.readonly = true;
  }




  actualizarUser() {

    this.spinner.show();
    this.factory
      .put('persona', this.factory.user.id, {
        nombre: this.persona.nombre,
        apellido: this.persona.apellido,
        cedula: this.persona.cedula,
        email: this.persona.email,
      })
      .subscribe(
        (response: any) => {
        localStorage.setItem('user', JSON.stringify(response));
          this.factory.loadUser();
          this.spinner.hide();
          this.toast.success('Usuario actulizado', 'Ok');
        },
        (error: any) => {
          console.log(error);
          this.spinner.hide();
          return this.toast.error(error.message, 'Problema en el servidor');
        }
      );
  }
  selectGrupo() {
    this.codeEncrypt = this.factory.encryptData(this.consulta.grupo, 5, 11);
  }
}


