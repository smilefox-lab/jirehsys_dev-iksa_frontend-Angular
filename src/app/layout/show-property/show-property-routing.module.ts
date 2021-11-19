import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowPropertyComponent } from './show-property.component';


const routes: Routes = [
  {
    path: ':id',
    component: ShowPropertyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowPropertyRoutingModule { }
