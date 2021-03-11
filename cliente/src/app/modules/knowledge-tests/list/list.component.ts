import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryService } from 'src/app/services/factory.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  pruebasConocimiento: any = [];
  constructor(private factory: FactoryService, private router: Router) { }

  ngOnInit(): void {
    this.loadResources();
  }
  loadResources() {
    this.factory.getAll('pruebaConocimiento').subscribe(
      (response: any) => {
        console.log(response);
        this.pruebasConocimiento = response;
      }
    );
  }
  viewer(item: any) {
    localStorage.setItem('prueba', item);
    this.router.navigate(['dashboard/knowledge/resolve']);
  }
  delete(id: any) {
    this.factory.delete('pruebaConocimiento', id).subscribe(
      (response: any) => {
        Swal.fire('Ok', 'Registro eliminado con exito', 'success');
        console.log(response);
        this.loadResources();
      },
      (error) => {
        console.log(error);
        Swal.fire('Oops', 'Error eliminandoo', 'error');
      }
    );
  }
}
