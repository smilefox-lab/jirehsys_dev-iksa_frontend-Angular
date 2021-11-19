
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivationEnd, Event } from '@angular/router';
import { filter, map, pluck, buffer, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BreadCrumb } from 'src/app/interfaces/bread-crumb';

const isNavigationEnd = (ev: Event) => ev instanceof NavigationEnd;
const isActivationEnd = (ev: Event) => ev instanceof ActivationEnd;

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: BreadCrumb[];
  public destroyed = new Subject<any>();


  constructor(
    private router: Router
  ) {
    const navigationEnd$ = this.router.events.pipe(filter(isNavigationEnd));
    this.router.events
    .pipe(
      filter(isActivationEnd),
      pluck('snapshot', 'data', 'bc'),
      buffer(navigationEnd$),
      map((routers: any[]) => {
        return routers.reduce((unique, item) => unique.find((obj: any) => obj === item)
          ? unique
          : [...unique, item],
        [])
        .reverse();
      }),
      takeUntil(this.destroyed)
    )
    .subscribe((routers) => {
      this.breadcrumbs = routers;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
