import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { bc: { label: 'Dashboard', url: '/', title: 'Dashboard' } }
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        data: { bc: { label: 'Perfil', url: '/profile', title: 'Perfil' } }
      },
      {
        path: 'search-properties',
        loadChildren: () => import('./search-property/search-property.module').then(m => m.SearchPropertyModule),
        data: { bc: { label: 'Búsqueda', url: '/search-properties', title: 'Búsqueda de Propiedades' } }
      },
      {
        path: 'show-property',
        loadChildren: () => import('./show-property/show-property.module').then(m => m.ShowPropertyModule),
        data: { bc: { label: 'Propiedad', url: '/show-property', title: 'Propiedades' } }
      },
      {
        path: 'properties',
        loadChildren: () => import('./property/property.module').then(m => m.PropertyModule)
      },
      {
        path: 'leases',
        loadChildren: () => import('./show-lease/show-lease.module').then(m => m.ShowLeaseModule)
      },
      {
        path: 'debtors',
        loadChildren: () => import('./show-debtor/show-debtor.module').then(m => m.ShowDebtorModule)
      },
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
