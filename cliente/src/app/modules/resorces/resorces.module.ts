import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import { ResorcesRoutingModule } from './resorces-routing.module';
import { DndDirective } from './direcitves/dnd.directive';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ViewerComponent } from './viewer/viewer.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';




@NgModule({
  declarations: [CreateResourceComponent, DndDirective,
    ProgressComponent,
    ListComponent,
    ViewerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResorcesRoutingModule,
    NgxDocViewerModule
  ]
})
export class ResorcesModule { }
