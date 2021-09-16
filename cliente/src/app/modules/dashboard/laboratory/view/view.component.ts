import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  constructor(
    private factory: FactoryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
  }
  addItem(files: any): any {
    this.spinner.show();
    console.log(files);
    const formData: FormData = new FormData();
    formData.append('name', this.factory.user.username);
    formData.append('estudiante', this.factory.user.id);
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      formData.append('file' + i, file, file.name);
    }
    this.factory.post('proyect/upload', formData).subscribe(
      (res: any) => {
        this.toast.success('Proyecto cargado con exitos');
        console.log(res);
        this.spinner.hide();
      },
      (err: any) => {
        this.toast.error('Error al cargar el proyecto');
        console.log(err);
        this.spinner.hide();
      }
    );
  }

}
