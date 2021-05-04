import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { MainComponent } from './main/main.component';
import { ViewTestComponent } from './view-test/view-test.component';


@NgModule({
  declarations: [MainComponent, ViewTestComponent],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
