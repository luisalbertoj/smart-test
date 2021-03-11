import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { ListComponent } from './list/list.component';
import { ViewerComponent } from './viewer/viewer.component';

const routes: Routes = [
  {path: 'create-resoruce', component: CreateResourceComponent},
  {path: 'list', component: ListComponent},
  {path: 'viewer/:item', component: ViewerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResorcesRoutingModule { }
