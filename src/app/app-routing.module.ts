import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  useHash: false,
  anchorScrolling: 'enabled',
  scrollOffset: [0, 10],
};

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    data: { bc: { label: 'Home', url: '/', title: 'Home' } },
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
