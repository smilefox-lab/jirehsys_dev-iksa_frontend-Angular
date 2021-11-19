import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

const isNavigationEnd = (event: Event) => event instanceof NavigationEnd;
const isActivationEnd = (event: Event) => event instanceof ActivationEnd;
const isActivatedRouter = (event: Event) => event instanceof ActivatedRoute;

@Component({
  selector: 'app-page-name',
  templateUrl: './page-name.component.html',
  styleUrls: ['./page-name.component.scss']
})
export class PageNameComponent implements OnInit {
  public title: string;
  constructor(private router: Router, activatedrouter: ActivatedRoute) {
    this.router.events
      .pipe(filter(isNavigationEnd))
      .subscribe(() => {
        const data: any = activatedrouter.firstChild.data;
        this.title = data.value.bc.title;
      });
  }

  ngOnInit(): void {
  }

}
