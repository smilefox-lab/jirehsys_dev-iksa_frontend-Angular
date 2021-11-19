import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowDebtorComponent } from './show-debtor.component';

const routes: Routes = [{ path: '', component: ShowDebtorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowDebtorRoutingModule { }
