import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/shared/services/property.service';
import { Observable } from 'rxjs';
import { tap, map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-property-available',
  templateUrl: './property-available.component.html',
  styleUrls: ['./property-available.component.scss']
})
export class PropertyAvailableComponent implements OnInit {

  typeStatus$: Observable<any>;
  summaryGraph$: Observable<any>;
  statusAvailable$: Observable<any>;
  statusRented$: Observable<any>;
  dateMonth: number = Date.now();

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {
    this.propertyService.propertiesByStatus$.subscribe();
    this.typeStatus$ = this.propertyService.groupByStatus();
    this.summaryGraph$ = this.propertyService.getSummaryByGraph();
    this.statusAvailable$ = this.propertyService.statusAvailable();
    this.statusRented$ = this.propertyService.statusRented();
  }

}
