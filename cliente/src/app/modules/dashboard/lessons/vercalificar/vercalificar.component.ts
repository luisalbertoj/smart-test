import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-vercalificar',
  templateUrl: './vercalificar.component.html',
  styleUrls: ['./vercalificar.component.css']
})
export class VercalificarComponent implements OnInit {
  
  public lecciones: any = [];

  constructor(
    public factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.factory.returnAsObservable().subscribe((subs) => {
      subs === true ? this.spinner.hide() : this.spinner.show();
    });
    this.loadLecciones();
  }

  loadLecciones() {
    this.factory.query('leccion/querys', { where: { } } ).subscribe(
      (response: any) => {
        console.log(response);
        this.lecciones = response.data;
        this.toast.success('Lecciones cargadas');
        console.log( this.lecciones )
      },
      (error: any) => {
        console.log(error);
        this.toast.error('Problema en la red');
      }
    );
  }

}
