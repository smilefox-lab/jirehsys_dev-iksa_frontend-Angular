import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

interface Option {
  name: string;
  anchor: string;
  href: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() options: Option[];
  @Input() showFilter = true;
  @Output() filter = new EventEmitter<MatDatepickerInputEvent<Date>>();

  constructor() { }

  ngOnInit(): void {
  }

  dateChange(event: MatDatepickerInputEvent<Date>) {
    const date = event;
    this.filter.emit(event);
  }
}
