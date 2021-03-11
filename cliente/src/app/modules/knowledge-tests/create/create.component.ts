import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  aux = [
    
    {
      pregunta: '',
      respuestas: ['', '', ''],
      correcta: 0
    },
    {
      pregunta: '',
      respuestas: ['', '', ''],
      correcta: 2
    },
    {
      pregunta: '',
      respuestas: ['', '', ''],
      correcta: 0
    },
    {
      pregunta: '',
      respuestas: ['', '', ''],
      correcta: 2
    },
    {
      pregunta: '',
      respuestas: ['', '', ''],
      correcta: 0
    }
  ];
  prueba: any = {
    nombre: '',
    contenido: '',
    creador: '8'
  };

  constructor(private factory: FactoryService) { }

  ngOnInit(): void {
  }
  guardar() {
    this.prueba.contenido = JSON.stringify(this.aux);
    this.factory.post('pruebaConocimiento', JSON.stringify(this.prueba)).subscribe(
      (response: any) => {
        Swal.fire('Ok', 'Registro creado con exito', 'success');
      },
      (error: any) => {
        Swal.fire('Oops', 'Error al crear el registro', 'error');
        console.log(error);
      }
    );

  }
}
