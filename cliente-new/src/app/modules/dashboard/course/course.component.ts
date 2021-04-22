import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  public leccion: any = this.course.get();

  constructor(private course: CourseService) { }

  ngOnInit(): void {
  }

  

}
