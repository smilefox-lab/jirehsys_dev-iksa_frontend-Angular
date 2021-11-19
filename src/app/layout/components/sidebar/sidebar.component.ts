import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/shared/services/alert.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public isExpanded: boolean;
  public user: User;
  public alerts: any[];
  public showMenu = false;
  private destroyed$ = new Subject();
  private toastrHidden = true;

  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService,
    private userService: UserService,
    private alertService: AlertService,
    private toastrService: ToastrService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit() {
    this.sidebarService.expanded$.subscribe(value => this.isExpanded = value);
    this.userService.me$.subscribe(user => this.user = user);
    this.alertService.list$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => {
        this.alerts = data;
      });
  }

  onExpanded() {
    this.sidebarService.toggle();
  }

  alignLabel(): string {
    return this.isExpanded ? 'start center' : 'start center';
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

  onBadgeHidden() {
    return this.alerts.length === 0;
  }

  onShowMenu() {
    this.showMenu = true;
  }

  onHideMenu() {
    this.showMenu = false;
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
