
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { PropertyService } from 'src/app/shared/services/property.service';
import { Property } from 'src/app/interfaces/property';
import { tap, takeUntil } from 'rxjs/operators';
import { TopnavService } from 'src/app/shared/services/topnav.service';

@Component({
  selector: 'app-search-property',
  templateUrl: './search-property.component.html',
  styleUrls: ['./search-property.component.scss']
})
export class SearchPropertyComponent implements OnInit, OnDestroy {
  properties$: Observable<Property[]>;
  pageSize: number = 20;
  currentPage: number = 0;
  lengthPages: number = 0;
  private destroyed$ = new Subject();

  constructor(
    private topnavService: TopnavService,
    private propertyService: PropertyService,
  ) { }

  ngOnInit(): void {
    this.topnavService.hideSelect = true;
    this.properties$ = this.propertyService.paginateProperty(this.currentPage, this.pageSize);
    this.propertyService.properties$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => this.lengthPages = data.length);
  }

  search(event) {
    this.propertyService.getList(event);
  }

  onChangePage(event) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.properties$ = this.propertyService.paginateProperty(this.currentPage, this.pageSize);
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
