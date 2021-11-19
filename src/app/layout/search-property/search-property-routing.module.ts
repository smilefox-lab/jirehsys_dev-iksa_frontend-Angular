import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPropertyComponent } from './search-property.component';

const routes: Routes = [
  {
    path: '',
    component: SearchPropertyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchPropertyRoutingModule { }
