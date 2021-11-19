import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowLeaseComponent } from './show-lease.component';

const routes: Routes = [{ path: '', component: ShowLeaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowLeaseRoutingModule { }
