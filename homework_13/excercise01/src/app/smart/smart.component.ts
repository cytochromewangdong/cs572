import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-smart',
  template: `<ul><app-dumb *ngFor="let row of data" [row]="row"></app-dumb></ul>`,
  styles:[]
})
export class SmartComponent implements OnInit {
  @Input() data:Array<any>;
  constructor() { }

  ngOnInit() {
  }

}
