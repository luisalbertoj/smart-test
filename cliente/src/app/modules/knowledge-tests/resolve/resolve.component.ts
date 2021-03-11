import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/models/question-base';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resolve',
  templateUrl: './resolve.component.html',
  styleUrls: ['./resolve.component.scss']
})
export class ResolveComponent implements OnInit {
  aux = [
    
    {
      pregunta: 'El proceso que consiste en todas las actividades del ciclo de vida, tanto estáticas como dinámicas relacionadas con la planificación, preparación y evaluación de productos de software y productos relacionados con el trabajo para determinar que cumplen los requisitos especificados, para demostrar que son aptos para el propósito y para detectar defectos.',
      respuestas: ['Fallo', 'Prueba', 'Defecto'],
      correcta: 0
    },
    {
      pregunta: 'Provocado por un error de implementación, por ejemplo el defecto lo provocará el haber utilizado el operador “x + y > z” en vez de “x + y => z”',
      respuestas: ['Defecto', 'Error', 'Fallo'],
      correcta: 1
    },
    {
      pregunta: 'Al ejecutar el programa con un defecto obtendremos resultados no deseados, por ejemplo, cuando el resultado de la suma de los dos componentes fuese igual, no obtendríamos los mismos resultados al compararlos con las sentencias indicadas anteriormente.',
      respuestas: ['Fallo', 'Prueba', 'Defecto'],
      correcta: 2
    },
    {
      pregunta: 'Está provocado por la acción humana, por ejemplo, el error lo provocará el desarrollador que realizará una incorrecta interpretación de un método del programa que producirá un resultado no esperado.',
      respuestas: ['Fallo', 'Prueba', 'Defecto'],
      correcta: 3
    },
    {
      pregunta: 'Está provocado por la acción humana, por ejemplo, el error lo provocará el desarrollador que realizará una incorrecta interpretación de un método del programa que producirá un resultado no esperado.',
      respuestas: ['Fallo', 'Prueba', 'Defecto'],
      correcta: 0
    }
  ];
  respuestas: any = [];
  test = [];
  constructor(public formBuilder: FormBuilder) {
    console.log(JSON.stringify(this.aux));
    this.test = JSON.parse(localStorage.getItem('prueba'));
    
  }

  ngOnInit(): void {
  }
  guardar() {
    console.log(this.respuestas);
    if(this.respuestas.length < 4) {
      Swal.fire('Oops', 'Debes completar el formulario', 'error');
      return 0;
    }
    let aciertos = 0;
    for (let i = 0; i < this.test.length; i++) {
      if(this.test[i].correcta === this.respuestas[i]) aciertos++
    }
    Swal.fire('Ok', 'Tu Resutado es:' + aciertos + ' correctas de 5 preguntas', 'success');
  }
  guardarRespuesta(item: any) {
    this.respuestas.push(item);
  }

}
