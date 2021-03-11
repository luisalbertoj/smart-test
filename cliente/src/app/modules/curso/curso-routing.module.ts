import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoComponent } from './curso/curso.component';

const routes: Routes = [
  {path: 'cursos', component: CursoComponent},
  {path: '', component: CursoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoRoutingModule { }
