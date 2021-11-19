import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/services/user.service';
import { SidebarService } from '../shared/services/sidebar.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isExpanded: boolean;

  constructor(
    private userService: UserService,
    private sidebarService: SidebarService,
  ) {}

  ngOnInit() {
    this.sidebarService.expanded$.subscribe(value => this.isExpanded = value);
    this.userService.getMe();
  }
}
