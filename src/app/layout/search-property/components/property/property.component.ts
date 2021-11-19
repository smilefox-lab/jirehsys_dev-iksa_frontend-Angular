import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/interfaces/property';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  @Input() property: Property;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  get imageUrl() {
    return this.property.image || 'assets/images/house.svg';
  }

  showProperty(id: number) {
    this.router.navigate(['/show-property', id]);
  }
}
