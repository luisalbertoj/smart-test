import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './plantilla/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './plantilla/layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/lessons/lessons.module').then(
            (m) => m.LessonsModule
          ),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./modules/admin/admin.module').then(
            (m) => m.AdminModule
          ),
      },
      {
        path: 'resources',
        loadChildren: () =>
          import('./modules/resorces/resorces.module').then(
            (m) => m.ResorcesModule
          ),
      },
      {
        path: 'knowledge',
        loadChildren: () =>
          import('./modules/knowledge-tests/knowledge-tests.module').then(
            (m) => m.KnowledgeTestsModule
          ),
      },
      {
        path: 'curso',
        loadChildren: () =>
          import('./modules/curso/curso.module').then(
            (m) => m.CursoModule
          ),
      }
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
];
