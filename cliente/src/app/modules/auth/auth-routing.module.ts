import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigInComponent } from './sig-in/sig-in.component';

const routes: Routes = [
  {path: '', component: SigInComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
