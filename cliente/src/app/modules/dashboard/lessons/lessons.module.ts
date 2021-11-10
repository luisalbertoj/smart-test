import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { LessonsRoutingModule } from './lessons-routing.module'
import { AngularEditorModule } from '@kolkov/angular-editor'
import { TagInputModule } from 'ngx-chips'
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'

import { NewLessonComponent } from './new-lesson/new-lesson.component'
import { HomeComponent } from './home/home.component'
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component'
import { LessonViewComponent } from './lesson-view/lesson-view.component'
import { ProgressComponent } from './progress/progress.component'
import { DashboardModule } from '../dashboard.module'
import { ResultComponent } from './result/result.component'
import { VercalificarComponent } from './vercalificar/vercalificar.component'
import { AddLessonGroupComponent } from './add-lesson-group/add-lesson-group.component'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { LaboratorModule } from '../laborator/laborator.module'

@NgModule({
  declarations: [
    NewLessonComponent,
    HomeComponent,
    LessonDetailComponent,
    LessonViewComponent,
    ProgressComponent,
    ResultComponent,
    VercalificarComponent,
    AddLessonGroupComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LessonsRoutingModule,
    AngularEditorModule,
    TagInputModule,
    DashboardModule,
    SelectDropDownModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    LaboratorModule
  ]
})
export class LessonsModule {}
