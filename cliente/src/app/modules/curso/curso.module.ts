import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursoRoutingModule } from './curso-routing.module';
import { CursoComponent } from './curso/curso.component';


@NgModule({
  declarations: [CursoComponent],
  imports: [
    CommonModule,
    CursoRoutingModule
  ]
})
export class CursoModule { }
