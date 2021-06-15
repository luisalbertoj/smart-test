import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.scss']
})
export class ViewTestComponent implements OnInit {

  public test = null;
  public respuestas = [];

  constructor(public factory: FactoryService, private rutaActiva: ActivatedRoute, private router: Router) { 

  }

  ngOnInit(): void {
     this.loadTest();
  }


  loadTest (){
    this.factory.get('getprueba', this.rutaActiva.snapshot.params.id).subscribe(
      (response: any) => {
        if(response.status === 500) {
          Swal.fire('Ops', response.data, 'info');
        } else {
          this.test = response.data;
          console.log(this.test);
        }
      }

      )
  }
 
  respuestaSeleccionada (index, respuesta) {
    this.respuestas[index]=respuesta;
  }

  validarRespuestas(){

    let response = {
      correctas:[],
      totales:this.test.preguntas.length,
      resUser:this.respuestas,
      test:this.test
    };
    for (let i = 0; i < this.respuestas.length; i++) {
      const element = this.respuestas[i];
      if (this.respuestas[i]==this.test.preguntas[i].respuestacorrecta) {
        response.correctas.push(this.test.preguntas[i]);
      }  
    }
    localStorage.setItem('result',JSON.stringify(response));
    this.router.navigate(['dashboard/test/result']);
  }
}
