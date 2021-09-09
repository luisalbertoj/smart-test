import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTestComponent } from './create-test/create-test.component';
import { MainComponent } from './main/main.component';
import { TestResultComponent } from './test-result/test-result.component';
import { ViewResultComponent } from './view-result/view-result.component';
import { ViewTestComponent } from './view-test/view-test.component';

const routes: Routes = [
  {path: 'create-test', component: CreateTestComponent},
  {path: 'view-result', component: ViewResultComponent},
  {path: '', component: MainComponent},
  {path: 'result', component: TestResultComponent},
  {path: ':id', component: ViewTestComponent},
  {path: 'create-test/:slug', component: CreateTestComponent},
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class TestRoutingModule { }
