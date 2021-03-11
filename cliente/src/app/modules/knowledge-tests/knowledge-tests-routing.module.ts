import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ResolveComponent } from './resolve/resolve.component';

const routes: Routes = [
  {path: 'create', component: CreateComponent},
  {path: 'resolve', component: ResolveComponent},
  {path: 'list', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeTestsRoutingModule { }
