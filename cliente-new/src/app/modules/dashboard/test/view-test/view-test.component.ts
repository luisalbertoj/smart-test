import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.scss']
})
export class ViewTestComponent implements OnInit {

  public test = false;

  constructor(public factory: FactoryService, private rutaActiva: ActivatedRoute) { 

  }

  ngOnInit(): void {
     this.loadTest();
  }


  loadTest (){
    this.factory.get('pruebaconocimiento', this.rutaActiva.snapshot.params.id).subscribe(
      (response: any) => { this.test = response}
      )
  }

}
