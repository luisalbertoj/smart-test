import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { LessonsRoutingModule } from './lessons-routing.module';
import { HomeLessonsComponent } from './home-lessons/home-lessons.component';
import { MaterialModule } from './../../app.module';
import { LessonComponent } from './lesson/lesson.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';



@NgModule({
  declarations: [HomeLessonsComponent, LessonComponent, DynamicFormComponent, DynamicFormQuestionComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LessonsRoutingModule,
    MaterialModule
  ]
})
export class LessonsModule { }
