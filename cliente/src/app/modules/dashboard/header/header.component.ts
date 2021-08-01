import { Component, OnInit } from '@angular/core';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  classperfil = "menu dropdown_account";

  constructor(public factory: FactoryService) { }



  ngOnInit(): void {
  }

  abrirPerfil(){
    this.classperfil = this.classperfil == "menu dropdown_account left transition visible"?
    "menu dropdown_account": "menu dropdown_account left transition visible";
  }

}
