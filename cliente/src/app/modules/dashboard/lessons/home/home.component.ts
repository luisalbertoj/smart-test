import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public leccion: any = this.course.get();
  
  constructor(private course: CourseService) { }

  ngOnInit(): void {
  }

}
