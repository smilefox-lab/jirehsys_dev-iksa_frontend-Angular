import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';

import { PropertyService } from 'src/app/shared/services/property.service';
import { filter, takeUntil } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { PdfService } from 'src/app/shared/services/pdf.service';
import { TopnavService } from 'src/app/shared/services/topnav.service';
import { ActivatedRoute, NavigationStart, Router, RouterState } from '@angular/router';

const COLUMNSEXPORT = [
  { header: 'CC', dataKey: 'id' },
  { header: 'Estatus', dataKey: 'status'},
  { header: 'Empresa', dataKey: 'company_name'},
  { header: 'Tipo', dataKey: 'type'},
  { header: 'Comuna', dataKey: 'commune'},
  { header: 'Cliente', dataKey: 'lessee_name'},
  { header: 'Inicio Contrato', dataKey: 'start_date'},
  { header: 'Rol', dataKey: 'role'},
  { header: 'M2', dataKey: 'square'},
  { header: 'Avalúo', dataKey: 'appraisal'},
  { header: 'Día de Pago', dataKey: 'cutoff_date'},
  { header: 'enero', dataKey: 'enero'},
  { header: 'febrero', dataKey: 'febrero'},
  { header: 'marzo', dataKey: 'marzo'},
  { header: 'abril', dataKey: 'abril'},
  { header: 'mayo', dataKey: 'mayo'},
  { header: 'junio', dataKey: 'junio'},
  { header: 'julio', dataKey: 'julio'},
  { header: 'agosto', dataKey: 'agosto'},
  { header: 'septiembre', dataKey: 'septiembre'},
  { header: 'octubre', dataKey: 'octubre'},
  { header: 'noviembre', dataKey: 'noviembre'},
  { header: 'diciembre', dataKey: 'diciembre'},
];

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit, OnDestroy {

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  sections = [
    {
      name: 'Propiedad',
      anchor: 'property'
    },
    {
      name: 'Indicadores',
      anchor: 'indicators'
    }
  ];
  dataSource: MatTableDataSource<any>;
  private destroyed$ = new Subject();
  private companyId = null;

  constructor(
    private topnavService: TopnavService,
    private propertyService: PropertyService,
    private excelService: ExcelService,
    private pdfService: PdfService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      let aux = params['companyId'];

      if (aux) {
        this.companyId = aux;
        this.checkSearch();
      }
   }); 
  }

  ngOnInit(): void {
    this.topnavService.hideSelect = true;

    if (!this.companyId) { 
      this.propertyService.getListByContract();
    }

    this.propertyService.propertiesByContract$
    .pipe(takeUntil(this.destroyed$))
    .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  checkSearch(): void {
    if (this.companyId) {
      this.search({
        find: "",
        type: null,
        company: this.companyId
      })
    }
  }

  getStatusColor(status: string) {
    return status === 'Arrendada' ? 'status-red' : 'status-yellow';
  }

  search(event): void {
    this.propertyService.getListByContract(event);
  }

  addEvent(event: MatDatepickerInputEvent<Date>): void {
    const date = event?.value?.toLocaleDateString();
    this.propertyService.getListByContract({ date });
  }

  exportAsXLS(): void {
    const customColumns = { A: 'CC', B: 'Propiedad', C: 'Estatus', D: 'Empresa ID', E: 'Empresa', F: 'Tipo', G: 'Comuna', H: 'Cliente', I: 'Inicio Contrato', J: 'Rol', K: 'M2', L: 'Avalúo', M: 'Día de Pago', N: 'Enero', O: 'Febrero', P: 'Marzo', Q: 'Abril', R: 'Mayo', S: 'Junio', T: 'Julio', U: 'Agosto', V: 'Septiembre', W: 'Octubre', X: 'Noviembre', Y: 'Diciembre', Z: 'Termino Contrato' };
    this.excelService.exportAsExcelFile(this.dataSource.data, 'indicadores_de_propiedad', customColumns);
  }

  exportAsPDF(): void {
    this.pdfService.downloadPDF(this.dataSource.data, COLUMNSEXPORT, 'indicadores_de_propiedad');
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
