import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.scss']
})
export class NewLessonComponent implements OnInit {

  plantilla: any = {
    menu1: 'Informacion general de la leccion'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
