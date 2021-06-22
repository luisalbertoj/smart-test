import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public window: any;

  constructor(@Inject(DOCUMENT) private document: Document) { 
    this.window = this.document.defaultView;
  }

  ngOnInit(): void {

  }


}
