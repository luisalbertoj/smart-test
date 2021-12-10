import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactoryService } from 'src/app/services/factory.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router, public factory: FactoryService) {
    this.factory.cargarPrivilegios();
  }

  ngOnInit(): void {
    this.menu();
  }

  public menu(): any {
    const tid = setInterval(() => {
      if (document.readyState !== 'complete') {
        return;
      }
      clearInterval(tid);

      const querySelector: any = document.querySelector.bind(document);

      const nav: any = document.querySelector('.vertical_nav');
      const wrapper: any = document.querySelector('.wrapper');

      const menu: any = document.getElementById('js-menu');
      const subnavs: any = menu.querySelectorAll('.menu--item__has_sub_menu');

      // Toggle menu click
      querySelector('.toggle_menu').onclick = () => {
        nav.classList.toggle('vertical_nav__opened');

        wrapper.classList.toggle('toggle-content');
      };

      // Minify menu on menu_minifier click
      querySelector('.collapse_menu').onclick = () => {
        nav.classList.toggle('vertical_nav__minify');

        wrapper.classList.toggle('wrapper__minify');

        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < subnavs.length; j++) {
          subnavs[j].classList.remove('menu--subitens__opened');
        }
      };

      // Open Sub Menu

      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < subnavs.length; i++) {
        if (subnavs[i].classList.contains('menu--item__has_sub_menu')) {
          subnavs[i].querySelector('.menu--link').addEventListener(
            'click',
            (e: any) => {
              // tslint:disable-next-line:prefer-for-of
              for (let j = 0; j < subnavs.length; j++) {
                if (e.target.offsetParent !== subnavs[j]) {
                  subnavs[j].classList.remove('menu--subitens__opened');
                }
              }

              e.target.offsetParent.classList.toggle('menu--subitens__opened');
            },
            false
          );
        }
      }
    }, 1000);
  }

  salir(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
