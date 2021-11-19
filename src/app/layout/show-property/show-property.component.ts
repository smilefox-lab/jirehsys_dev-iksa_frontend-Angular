import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { PropertyService } from 'src/app/shared/services/property.service';
import { Indicator } from 'src/app/interfaces/indicator';
import { LeaseService } from 'src/app/shared/services/lease.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { Property } from 'src/app/interfaces/property';
import { TopnavService } from 'src/app/shared/services/topnav.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CompanyService } from 'src/app/shared/services/company.service';

const COLUMNSEXPORT = [
  { header: 'Mes', dataKey: 'date' },
  { header: 'Día de Pago', dataKey: 'date'},
  { header: 'Monto Real', dataKey: 'paid'},
  { header: 'Canon Esperado', dataKey: 'expected'},
];

interface Payment {
  date: Date;
}

@Component({
  selector: 'app-show-property',
  templateUrl: './show-property.component.html',
  styleUrls: ['./show-property.component.scss']
})
export class ShowPropertyComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  sections = [
    {
      name: 'Overview',
      anchor: 'overview'
    },
    {
      name: 'Indicadores',
      anchor: 'indicators'
    },
    {
      name: 'Historial de Pagos',
      anchor: 'payment_history'
    },
    {
      name: 'Documentos',
      anchor: 'files'
    },
  ];

  property: Property;
  lineData: any;
  filterForm: FormGroup;
  holdingLatest$: Observable<Indicator>;
  holdingBefore$: Observable<Indicator>;
  dataSource: MatTableDataSource<any>;
  dataSourceTop: MatTableDataSource<any>;
  private destroyed$ = new Subject();

  get fromDate() { return moment(this.filterForm.get('fromDate').value).format('DD-MM-YYYY'); }

  constructor(
    private route: ActivatedRoute,
    private topnavService: TopnavService,
    private propertyService: PropertyService,
    private leaseService: LeaseService,
    private excelService: ExcelService,
    private pdfService: PdfService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.topnavService.hideSelect = true;
    this.filterForm = new FormGroup({
      fromDate: new FormControl(),
    });
    this.propertyService.getById(this.route.snapshot.params.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.dataSource = new MatTableDataSource(data.payments as Payment[]);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (item, filter) => {
          if (moment(this.fromDate).isValid()) {
            return moment(item.date).isSameOrBefore(this.fromDate);
          }
          return true;
        };
        this.dataSourceTop = new MatTableDataSource(data.top_payments);
        this.dataSourceTop.sort = this.sort;
        this.property = data;
        this.lineData = data.payments?.reduceRight((acc, point) =>
          {
            acc[0].data = [ ...acc[0].data, { y: parseInt(point.paid, 10), name: point.date} ];
            acc[1].data = [ ...acc[1].data, { y: parseInt(point.expected, 10), name: point.date} ];
            return acc;
          },
          [
            {
              type: 'line',
              color: '#febc2c',
              name: 'Real',
              data: [],
            },
            {
              type: 'line',
              color: '#fd413c',
              name: 'Esperado',
              data: [],
            }
          ]
        );
      });
    this.holdingLatest$ = this.leaseService.holdingIndicatorsLatest();
    this.holdingBefore$ = this.leaseService.holdingIndicatorsBefore();
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    const date = event?.value?.toLocaleDateString();
    this.propertyService.getListByContract({ date });
  }

  exportAsXLS(): void {
    const customColumns = { A: 'ID Pago', B: 'ID Contrato', C: 'Fecha de Pago', D: 'Monto Pagodo', E: 'Monto Esperado' };
    this.excelService.exportAsExcelFile(this.dataSource.data, 'historial_de_pago', customColumns);
  }

  exportAsPDF(): void {
    this.pdfService.downloadPDF(this.dataSource.data, COLUMNSEXPORT, 'historial_de_pago');
  }

  changeDate(date: string) {
    if (date) {
      return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    }
  }

  progress(latest: number, before: number) {
    return parseFloat((latest - before).toFixed(2));
  }

  getOperator(latest: number, before: number) {
    return latest > before ? 'gt' : latest < before ? 'st' : 'eq';
  }

  getDiff(latest: number, before: number) {
    if ( parseFloat(latest?.toString()) === 0 || latest === before) {
      return 0;
    }

    return parseFloat((100 - (before * 100) / latest).toFixed(2));
  }

  selectClassIcon(operator: string) {
    if (operator === 'gt') {
      return 'mat-icon-rotate-positive';
    } else if (operator === 'st') {
      return 'mat-icon-rotate-negative';
    } else {
      return 'mat-icon-hidden';
    }
  }

  selectClasstitle(operator: string) {
    if (operator === 'gt') {
      return 'indicator-sub-title-positive';
    } else if (operator === 'st') {
      return 'indicator-sub-title-negative';
    } else {
      return 'indicator-sub-title-equal';
    }
  }

  applyFilter(event: MatDatepickerInputEvent<Date>) {
    const filterValue = moment(event.target.value).format('DD-MM-YYYY');
    this.dataSource.filter = filterValue;
  }

  getFileName(file: string) {
    const name = file.split('/');
    return name[name.length - 1];
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  download(fileUrl) {
    this.companyService.downloadFile(`real-estate/${fileUrl}`, this.getFileName(fileUrl));
  }
}
