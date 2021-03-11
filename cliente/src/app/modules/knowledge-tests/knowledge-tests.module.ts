import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { KnowledgeTestsRoutingModule } from './knowledge-tests-routing.module';
import { CreateComponent } from './create/create.component';
import { ResolveComponent } from './resolve/resolve.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/app.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [CreateComponent, ResolveComponent, DynamicFormComponent, DynamicFormQuestionComponent, ListComponent],
  imports: [
    CommonModule,
    KnowledgeTestsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class KnowledgeTestsModule { }
