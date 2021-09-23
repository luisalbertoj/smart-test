import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryService } from 'src/app/services/factory.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  classperfil = 'menu dropdown_account';
  public env = environment.urlMedia;

  constructor(public factory: FactoryService, private router: Router) {}

  ngOnInit(): void {
    this.factory.loadUser();
  }

  abrirPerfil(): void {
    this.classperfil =
      this.classperfil === 'menu dropdown_account left transition visible'
        ? 'menu dropdown_account'
        : 'menu dropdown_account left transition visible';
  }

  salir(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
