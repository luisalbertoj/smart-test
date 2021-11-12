import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TestRoutingModule } from './test-routing.module'
import { MainComponent } from './main/main.component'
import { ViewTestComponent } from './view-test/view-test.component'
import { TestResultComponent } from './test-result/test-result.component'
import { CreateTestComponent } from './create-test/create-test.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AngularEditorModule } from '@kolkov/angular-editor'
import { TagInputModule } from 'ngx-chips'
import { MaterialModule } from '../../../material.module'
import { ViewResultComponent } from './view-result/view-result.component'
import { DashboardModule } from '../dashboard.module'
import { AddLessonGroupComponent } from './add-test-group/add-lesson-group.component'
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { MatInputModule } from '@angular/material/input'

@NgModule({
  declarations: [
    MainComponent,
    ViewTestComponent,
    TestResultComponent,
    CreateTestComponent,
    ViewResultComponent,
    AddLessonGroupComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    AngularEditorModule,
    TagInputModule,
    MaterialModule,
    DashboardModule,
    SelectDropDownModule,
    MatInputModule
  ]
})
export class TestModule {}
