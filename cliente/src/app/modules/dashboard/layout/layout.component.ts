import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  lecciones: any = [];
  pruebas: any = [];
  recursos: any = [];
  laboratorios: any = [];
  reportes: any = [];
  admin: any = [];

  constructor(private router: Router, public factory: FactoryService) {}

  ngOnInit(): void {
    this.factory.loadUser();
    this.cargarPrivilegios();
    this.menu();
    console.log(this.factory.user);
  }
  cargarPrivilegios(): void {
    this.factory.user.idRol.privilegios.forEach((priv: any) => {
      if (priv.nombre === 'lecciones') {
        this.lecciones.push({
          nombre: priv.nombre,
          path: '/dashboard/lesson',
        });
      }
      if (priv.nombre === 'Crear lecciones') {
        this.lecciones.push({
          nombre: priv.nombre,
          path: '/dashboard/lesson/new',
        });
      }
      if (priv.nombre === 'Resultados lecciones') {
        this.lecciones.push({
          nombre: priv.nombre,
          path: '/dashboard/lesson/result',
        });
      }
      if (priv.nombre === 'Mis pruebas') {
        this.pruebas.push({
          nombre: priv.nombre,
          path: '/dashboard/test',
        });
      }
      if (priv.nombre === 'Crear pruebas') {
        this.pruebas.push({
          nombre: priv.nombre,
          path: '/dashboard/test/create-test',
        });
      }
      if (priv.nombre === 'Resultados conocimiento') {
        this.pruebas.push({
          nombre: priv.nombre,
          path: '/dashboard/test/view-result',
        });
      }
      if (priv.nombre === 'Ver recurso') {
        this.recursos.push({
          nombre: priv.nombre,
          path: '/dashboard/resources',
        });
      }
      if (priv.nombre === 'Nuevo recurso') {
        this.recursos.push({
          nombre: priv.nombre,
          path: '/dashboard/resources/create-resoruce',
        });
      }
      if (priv.nombre === 'Mis laboratorios') {
        this.laboratorios.push({
          nombre: priv.nombre,
          path: '/dashboard/laboratory',
        });
      }
      if (priv.nombre === 'Ver reporte') {
        this.reportes.push({
          nombre: priv.nombre,
          path: '/dashboard/reportes/',
        });
      }
      if (priv.nombre === 'Admin usuario') {
        this.admin.push({
          nombre: priv.nombre,
          path: '/dashboard/admin/user-list',
        });
      }
      if (priv.nombre === 'Admin nuevo usuario') {
        this.admin.push({
          nombre: priv.nombre,
          path: '/dashboard/admin/user',
        });
      }
      if (priv.nombre === 'Admin privilegios') {
        this.admin.push({
          nombre: priv.nombre,
          path: '/dashboard/admin/privilegios',
        });
      }
      if (priv.nombre === 'Admin IE lessons') {
        this.admin.push({
          nombre: priv.nombre,
          path: '/dashboard/admin/import-export/lessons',
        });
      }
      if (priv.nombre === 'Admin IE preconceptos') {
        this.admin.push({
          nombre: priv.nombre,
          path: '/dashboard/admin/import-export/preconceptos',
        });
      }
    });
  }
  menu(): any {
    /*
==========================
Vertical Responsive Menu
==========================
*/

    'use strict';

    var tid = setInterval(function () {
      if (document.readyState !== 'complete') return;
      clearInterval(tid);

      var querySelector = document.querySelector.bind(document);

      var nav = document.querySelector('.vertical_nav');
      var wrapper = document.querySelector('.wrapper');

      var menu = document.getElementById('js-menu');
      var subnavs = menu.querySelectorAll('.menu--item__has_sub_menu');

      // Toggle menu click
      querySelector('.toggle_menu').onclick = function () {
        nav.classList.toggle('vertical_nav__opened');

        wrapper.classList.toggle('toggle-content');
      };

      // Minify menu on menu_minifier click
      querySelector('.collapse_menu').onclick = function () {
        nav.classList.toggle('vertical_nav__minify');

        wrapper.classList.toggle('wrapper__minify');

        for (var j = 0; j < subnavs.length; j++) {
          subnavs[j].classList.remove('menu--subitens__opened');
        }
      };

      // Open Sub Menu

      for (var i = 0; i < subnavs.length; i++) {
        if (subnavs[i].classList.contains('menu--item__has_sub_menu')) {
          subnavs[i].querySelector('.menu--link').addEventListener(
            'click',
            function (e: any) {
              for (var j = 0; j < subnavs.length; j++) {
                if (e.target.offsetParent != subnavs[j])
                  subnavs[j].classList.remove('menu--subitens__opened');
              }

              e.target.offsetParent.classList.toggle('menu--subitens__opened');
            },
            false
          );
        }
      }
    }, 100);
  }

  salir() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
