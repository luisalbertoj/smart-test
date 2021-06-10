import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ViewTestComponent } from './view-test/view-test.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: ':id', component: ViewTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class TestRoutingModule { }
