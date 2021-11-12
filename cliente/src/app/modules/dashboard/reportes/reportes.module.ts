import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ReportesRoutingModule } from './reportes-routing.module'
import { ViewComponent } from './view/view.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SelectDropDownModule } from 'ngx-select-dropdown'

@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectDropDownModule
  ]
})
export class ReportesModule {}
