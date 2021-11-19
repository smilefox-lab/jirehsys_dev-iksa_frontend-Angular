import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchAddonComponent } from './search-addon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [SearchAddonComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchAddonComponent
  ]
})
export class SearchAddonModule { }
