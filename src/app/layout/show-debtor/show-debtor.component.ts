import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { takeUntil, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSort } from '@angular/material/sort';

import { DebtorService } from 'src/app/shared/services/debtor.service';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { TopnavService } from 'src/app/shared/services/topnav.service';

const COLUMNSEXPORT = [
  { header: 'CC', dataKey: 'property_id' },
  { header: 'Arrendatario', dataKey: 'lessee_name'},
  { header: 'Rut', dataKey: 'lessee_rut'},
  { header: 'monto Adeudado', dataKey: 'expected'},
  { header: 'Estatus', dataKey: 'status'},
  { header: 'Meses', dataKey: 'months'}
];

@Component({
  selector: 'app-show-debtor',
  templateUrl: './show-debtor.component.html',
  styleUrls: ['./show-debtor.component.scss']
})
export class ShowDebtorComponent implements OnInit, OnDestroy {

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
  debtorsList$: Observable<any>;
  lineDate$: Observable<any>;
  private destroyed$ = new Subject();

  constructor(
    private debtorService: DebtorService,
    private excelService: ExcelService,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    this.dateSelect = Date.now();
    this.debtorService.getList();
    this.debtorsList$ = this.debtorService.list$;
    this.debtorsList$
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
    return status === 'Mora' ? 'status-red' : 'status-yellow';
  }

  search(event) {
    this.debtorService.getList(event);
  }

  filterByDate(event: MatDatepickerInputEvent<Date>) {
    const date = event?.value?.toLocaleDateString();
    this.debtorService.getOverview({ date });
    this.dateSelect = event?.value?.getTime();
  }

  exportAsXLS(): void {
    const customColumns = { A: 'CC', B: 'Arrendatario', C: 'Rut', D: 'Estatus', E: 'Meses', F: 'Monto Adeudado' };
    this.excelService.exportAsExcelFile(this.dataSource.data, 'indicadores_de_deudores', customColumns);
  }

  exportAsPDF(): void {
    this.pdfService.downloadPDF(this.dataSource.data, COLUMNSEXPORT, 'indicadores_de_deudores');
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
