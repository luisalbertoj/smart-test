import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  // '0a6b164c-9a42-48ae-9727-6866279244d4.docx'
  item: any = "";
  doc = "";
  constructor(private factory: FactoryService, private router: ActivatedRoute) {
    this.item = this.router.snapshot.params.item;
    console.log(this.item);
    this.doc = this.factory.apiMedia + '/' + this.item;
  }

  ngOnInit(): void {
  }

}
