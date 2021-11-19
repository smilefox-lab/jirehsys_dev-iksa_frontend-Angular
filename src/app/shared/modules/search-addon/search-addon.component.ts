import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { TypeService } from '../../services/type.service';
import { Company } from 'src/app/interfaces/company';
import { CompanyService } from '../../services/company.service';

interface Filter {
  find: string;
  type: number;
  company: number;
}

@Component({
  selector: 'app-search-addon',
  templateUrl: './search-addon.component.html',
  styleUrls: ['./search-addon.component.scss']
})
export class SearchAddonComponent implements OnInit {

  @Input() placeholder = '';
  @Output() filter = new EventEmitter<Filter>();

  types$: Observable<any>;
  companies$: Observable<Company[]>;
  constructor(
    private typeServive: TypeService,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.types$ = this.typeServive.type$;
    this.companies$ = this.companyService.companies$;
  }

  fetch(find = '', type = null, company = null) {
    this.filter.emit({ find, type, company });
  }
}
