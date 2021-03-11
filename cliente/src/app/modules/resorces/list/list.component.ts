import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  recursosEducativos: any = [];
  item: any = '0a6b164c-9a42-48ae-9727-6866279244d4.docx';
  doc = this.factory.apiMedia + '/' + this.item;

  constructor(private factory: FactoryService,  private router: Router) { }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.factory.getAll('recursoEducativo').subscribe(
      (response: any) => {
        console.log(response);
        this.recursosEducativos = response;
      },
      (error: any) => console.log(error)
    );
  }
  viewer(item: any) {
    this.item = item;
    this.router.navigate(['dashboard/resources/viewer/' + this.item]);
  }
  delete(id: any) {
    this.factory.delete('recursoEducativo', id).subscribe(
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
