import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSort } from '@angular/material/sort';
import { takeUntil, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { DebtorService } from 'src/app/shared/services/debtor.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { LeaseService } from 'src/app/shared/services/lease.service';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { TopnavService } from 'src/app/shared/services/topnav.service';


const COLUMNSEXPORT = [
  { header: 'CC', dataKey: 'property_id' },
  { header: 'Nombre de la Propiedad', dataKey: 'property_name'},
  { header: 'Valor de la Propiedad', dataKey: 'appraisal'},
  { header: 'Canon Real', dataKey: 'paid'},
  { header: 'Canon Esperado', dataKey: 'expected'},
  { header: 'Estatus', dataKey: 'status'},
  { header: 'Meses de Moras', dataKey: 'months'}
];

@Component({
  selector: 'app-show-lease',
  templateUrl: './show-lease.component.html',
  styleUrls: ['./show-lease.component.scss']
})
export class ShowLeaseComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  sections = [
    {
      name: 'Overview',
      anchor: 'overview'
    },
    {
      name: 'Indicadores',
      anchor: 'indicators'
    }
  ];
  dateSelect: number;
  dataSource: MatTableDataSource<any>;
  leasesList$: Observable<any>;
  lineDate$: Observable<any>;
  private destroyed$ = new Subject();

  constructor(
    private topnavService: TopnavService,
    private leaseService: LeaseService,
    private debtorService: DebtorService,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.topnavService.hideSelect = true;
    this.dateSelect = Date.now();
    this.leaseService.getList();
    this.leasesList$ = this.leaseService.list$;
    this.leasesList$
      .pipe(takeUntil(this.destroyed$))
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
        });
    this.lineDate$ = this.debtorService.historyGraph$.pipe(
      map(points => points.reduce(
        (acc, point: any) => {
          acc[0].data = [ ...acc[0].data, { y: parseInt(point.default, 10), name: point.point_date } ];
          acc[1].data = [ ...acc[1].data, { y: parseInt(point.delay, 10), name: point.point_date } ];
          return acc;
        },
        [
          {
            type: 'line',
            color: '#febc2c',
            name: 'Mora',
            data: [],
          },
          {
            type: 'line',
            color: '#fd413c',
            name: 'Retraso',
            data: [],
          }
        ]
      ),
      )
    );
  }

  getStatusColor(status: string) {
    return status?.toLowerCase() === 'pagado' ? 'status-yellow' : 'status-red';
  }

  search(event: any) {
    this.leaseService.getList(event);
  }

  filterByDate(event: MatDatepickerInputEvent<Date>) {
    const date = event?.value?.toLocaleDateString();
    this.leaseService.getIndicators({ date });
    this.dateSelect = event?.value?.getTime();
  }

  exportAsXLS(): void {
    const customColumns = { A: 'CC', B: 'Nombre Propiedad', C: 'Valor Propiedad', D: 'Canon Real', E: 'Estatus', F: 'Meses de Mora' };
    this.excelService.exportAsExcelFile(this.dataSource.data, 'indicadores_de_arriendo', customColumns);
  }

  exportAsPDF(): void {
    this.pdfService.downloadPDF(this.dataSource.data, COLUMNSEXPORT, 'indicadores_de_arriendo');
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
