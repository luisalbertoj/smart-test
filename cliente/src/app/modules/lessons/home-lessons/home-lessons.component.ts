import {FlatTreeControl} from '@angular/cdk/tree';
import { Component } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Router } from '@angular/router';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: '1. Introducción a la prueba de software.',
    children: [
      {name: '1.1. Fundamentos de la prueba de software.'},
      {name: '1.2. Propósito de la prueba de software.'},
      {name: '1.3. Verificación y validación.'},
      {name: '1.4. Principios de la prueba de software.'}
    ]
  },
  {
    name: '2. Tipos de prueba de software.',
    children: [
      {name: '2.1. Modelos de la prueba de software.',
      children: [
        {name: '2.1.1. Introducción al Modelo V.'},
        {name: '2.1.2. Introducción al Modelo W.'}
      ]},
      {name: '2.2. Pruebas estáticas.'},
      {name: '2.3. Pruebas dinámicas.'},
      {name: '2.4. Pruebas de caja negra.'},
      {name: '2.5. Pruebas de caja blanca.'}
    ]
  },
  {
    name: '3. La prueba en el ciclo de vida de un producto de software.',
    children: [
      {name: '3.1. Proceso de la prueba.'},
      {name: '3.2. Contexto de la prueba.'},
      {name: '3.3. Modelos de calidad.'},
    ]
  }, {
    name: '4. Métodos de diseño de prueba de software.',
    children: [
      {name: '4.1. Partición de equivalencia.'},
      {name: '4.2. Valores al límite.'},
      {name: '4.3. Tablas de decisión.'},
    ]
  }, {
    name: '5. Herramientas para el apoyo del proceso de pruebas.',
    children: [
      {name: '5.1. Herramientas para el diseño y ejecución de la prueba (herramientas para desarrollar pruebas de estrés, pruebas unitarias y pruebas para móviles).'},
      {name: '5.2. Herramientas para la administración de anomalías.'}
    ]
  }
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-home-lessons',
  templateUrl: './home-lessons.component.html',
  styleUrls: ['./home-lessons.component.scss']
})
export class HomeLessonsComponent  {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  lesson(selected): any {
   console.log(selected);
   localStorage.setItem('lesson-selected', selected);
   this.router.navigate(['dashboard/lesson']);
  }

}
