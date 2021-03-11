import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { FactoryService } from 'src/app/services/factory.service';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    slug?: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    slug?: string;
    ab: string;
    type?: string;
}
export interface Persona {
    img: string;
    nombres: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Lecciónes',
        slug: 'modulo-lecciones',
        type: 'link',
        icontype: 'dashboard'
    },
    {
        path: '/dashboard/admin',
        title: 'Administración',
        slug: 'modulo-admin',
        type: 'sub',
        icontype: 'build',
        collapse: 'components',
        children: [
            {path: 'user-list', title: 'Lista de Usuarios', ab:'UL'},
            {path: 'user', title: 'Agregar Nuevo Usuario', ab:'UN'},
            {path: 'privilegios', title: 'Cambiar Privilegios', ab:'CP'}
        ]
    },
    {
        path: '/dashboard/resources',
        title: 'Recursos Educativos',
        slug: 'recursos-educativos',
        type: 'sub',
        icontype: 'book',
        collapse: 'recursos',
        children: [
            {path: 'create-resoruce', title: 'Nuevo Recurso', ab:'NR'},
            {path: 'list', title: 'Ver Recursos Disponibles', ab:'RD'}
        ]
    },
    {
        path: '/dashboard/knowledge',
        title: 'Pruebas Conocimiento',
        slug: 'pruebas-conocimiento',
        type: 'sub',
        icontype: 'start',
        collapse: 'pruebas',
        children: [
            {path: 'create', title: 'Nueva Prueba', ab:'NR'},
            {path: 'list', title: 'Ver Pruebas Disponibles', ab:'PD'}
        ]
    }
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ps: any;
    user: Persona = {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png',
        nombres: 'Luis Jaimes'
    };
    constructor(public factory: FactoryService) {}

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void  {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
