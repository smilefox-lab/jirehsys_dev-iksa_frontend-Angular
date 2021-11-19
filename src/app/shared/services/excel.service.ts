import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  public exportAsExcelFile(json: any[], excelFileName: string, customColumns: object = {}, header: string[] = []): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([customColumns], { skipHeader: true });
    XLSX.utils.sheet_add_json(ws, json, {skipHeader: true, origin: 'A2'});

    const workbook: XLSX.WorkBook = {
      Sheets: { data: ws },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
