import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }
}
