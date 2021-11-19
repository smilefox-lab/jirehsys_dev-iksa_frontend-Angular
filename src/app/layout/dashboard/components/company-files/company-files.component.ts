import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/shared/services/company.service';

@Component({
  selector: 'app-company-files',
  templateUrl: './company-files.component.html',
  styleUrls: ['./company-files.component.scss'],
})
export class CompanyFilesComponent implements OnInit {
  @Input() files = [];

  selectedCompanyFiles$: Observable<any>;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.selectedCompanyFiles$ = this.companyService.selectedCompanyFiles$;
  }

  getFileName(file: string): string {
    const name = file.split('/');
    return name[name.length - 1];
  }

  download(fileUrl) {
    this.companyService.downloadFile(fileUrl, this.getFileName(fileUrl));
  }
}
