import { Component, OnInit, Input } from '@angular/core';
import { PropertyService } from 'src/app/shared/services/property.service';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  @Input() showTitle = true;
  @Input() showLink = true;

  summaryByType$: Observable<any>;
  summaryByCompany$: Observable<any>;
  summary;
  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.propertyService.getByTypeAndCompany();
    this.summaryByType$ = this.propertyService.summaryByType();
    this.summaryByCompany$ = this.propertyService.summaryByCompany();
  }

  redirectTo(companyId) {
    this.router.navigate(['/properties'], { queryParams: { companyId }, skipLocationChange: true});

    let el = document.getElementById("properties");
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
