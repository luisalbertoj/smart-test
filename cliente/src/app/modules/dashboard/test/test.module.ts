import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { MainComponent } from './main/main.component';
import { ViewTestComponent } from './view-test/view-test.component';
import { TestResultComponent } from './test-result/test-result.component';


@NgModule({
  declarations: [MainComponent, ViewTestComponent, TestResultComponent],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
