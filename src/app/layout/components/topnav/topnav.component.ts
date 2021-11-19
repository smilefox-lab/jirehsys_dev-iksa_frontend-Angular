import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/services/auth.service';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { MIndicadorClService } from 'src/app/shared/services/mindicador-cl.service';
import { CompanyService } from 'src/app/shared/services/company.service';
import { Company } from 'src/app/interfaces/company';
import { TypeService } from 'src/app/shared/services/type.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DebtorService } from 'src/app/shared/services/debtor.service';
import { LeaseService } from 'src/app/shared/services/lease.service';
import { PropertyService } from 'src/app/shared/services/property.service';
import { User } from 'src/app/interfaces/user';
import { TopnavService } from 'src/app/shared/services/topnav.service';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit, OnDestroy {


  selectedCompany$: Observable<string>;
  companies$: Observable<Company[]>;
  indicator$: Observable<any>;
  hideSelect$: Observable<any>;
  user: User;
  alerts: any[];

  private destroyed$ = new Subject();
  private toastrHidden = true;

  constructor(
    private topnavService: TopnavService,
    private authService: AuthService,
    private sidebarService: SidebarService,
    private mIndicatorService: MIndicadorClService,
    private companyService: CompanyService,
    private typeService: TypeService,
    private notificationService: NotificationService,
    private alertService: AlertService,
    private toastrService: ToastrService,
    private leaseService: LeaseService,
    private debtorService: DebtorService,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.mIndicatorService.getIndicator();
    this.companyService.getUserCompany();
    this.typeService.getType();
    this.alertService.getList();
    this.leaseService.getIndicators();
    this.leaseService.getCompaniesIndicators();
    this.debtorService.getOverview();
    this.debtorService.getHistoryGraph();
    this.propertyService.getByTypeStatus();
    this.propertyService.getByStatus();

    this.hideSelect$ = this.topnavService.hideSelect$;
    this.companies$ = this.companyService.companies$;

    this.indicator$ = this.mIndicatorService.indicators$;
    this.selectedCompany$ = this.companyService.selectedCompany$;
    this.alertService.list$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.alerts = data;
      });

    this.user = this.authService.currentUserValue;
    this.companyService.selectedCompany = this.user?.company?.id?.toString() || '';
    this.showHolding();
  }

  toggleSidebar() {
    this.sidebarService.toggle();
  }

  changedCompany(value: string) {
    this.companyService.selectedCompany = value;
    this.debtorService.getOverview({ company: value });
    this.debtorService.getHistoryGraph({ company: value });
    this.propertyService.getByTypeStatus({ company: value });
    this.propertyService.getByStatus({ company: value });
    this.debtorService.getTop({ company: value });
  }

  showAlert() {
    if (this.toastrHidden) {
      this.alerts.forEach((_alert) => {
        this.notificationService.showAlert(_alert);
      });
      this.toastrHidden = false;
    } else {
      this.toastrService.clear();
      this.toastrHidden = true;
    }
  }

  showHolding() {
    return this.user?.roles?.some(role => role.name.toLowerCase() === 'admin') || this.user.isSuper;
  }

  onBadgeHidden() {
    return this.alerts.length === 0;
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
