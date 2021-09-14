import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  public window: any;

  constructor(@Inject(DOCUMENT) private document: Document, private factory: FactoryService) {
    this.window = this.document.defaultView;
  }

  ngOnInit(): void {
    this.factory.getAll('rol').subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }
}
