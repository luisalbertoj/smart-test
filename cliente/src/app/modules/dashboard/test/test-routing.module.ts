import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTestComponent } from './create-test/create-test.component';
import { MainComponent } from './main/main.component';
import { TestResultComponent } from './test-result/test-result.component';
import { ViewTestComponent } from './view-test/view-test.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'result', component: TestResultComponent},
  {path: ':id', component: ViewTestComponent},
  {path: '', component: CreateTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class TestRoutingModule { }
