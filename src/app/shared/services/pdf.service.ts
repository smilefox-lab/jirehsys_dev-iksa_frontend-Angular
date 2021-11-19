import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PDF_EXTENSION = '.pdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {


  constructor() { }

  public downloadPDF(body: any[], columns: any[], fileName: string, columnStyles = {}): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      format: 'legal'
    });

    autoTable(doc, {
        margin: { top: 5, left: 1, right: 1, bottom: 5 },
        showHead: 'everyPage',
        body,
        columns,
        columnStyles
    });

    doc.save(`${fileName}_export_${new Date().getTime()}${PDF_EXTENSION}`);
  }
}
