import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dumb',
  template:`<li>{{row}}</li>`,
  styles: []
})
export class DumbComponent implements OnInit {

  @Input() row:any;
  constructor() { }

  ngOnInit() {
  }

}
