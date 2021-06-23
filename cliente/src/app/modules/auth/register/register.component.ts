import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public persona: any = {
    nombre: '',
    apellido: '',
    email: '',
    username: '',
    password: '',
    idRol: '3'
  };

  constructor(private factory: FactoryService,
    private router: Router,
    private toast: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.factory.returnAsObservable().subscribe((subs) => {
      subs===true?this.spinner.hide():this.spinner.show();
    });
  }

  registrar() {
    console.log(this.persona);
    if(this.persona.nombre === '') return this.toast.error('Debes ingresar tu nombre');
    if(this.persona.apellido === '') return this.toast.error('Debes ingresar tu apellido');
    if(this.persona.email === '') return this.toast.error('Debes ingresar tu correo electronico');
    if(this.persona.username === '') return this.toast.error('Debes ingresar tu username');
    if(this.persona.password === '') return this.toast.error('Debes ingresar tu contraseña');
    this.factory.post('persona', this.persona).subscribe(
      (response: any) => {
        this.toast.success('usuario creado');
        this.router.navigate(['auth']);
      },
      (error: any) => {
        console.log(error);
        this.toast.error('Error del servidor');
      }
    );
  }

}
