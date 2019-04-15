import { Component, ViewChild, OnInit } from '@angular/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-root',
  template:`
  <app-counter (counterChange)="counterChange($event)" [counter]="ComponentCounterValue">
  </app-counter>
  <p>The value in parent:{{ComponentCounterValue}}</p>
  `,
  styles: []
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
  }
  ComponentCounterValue:number = 20;
  // counter:number = 8;
  title = 'exercise01';
  counterChange(e){
    console.log(e);
    // this.counter= e;
    this.ComponentCounterValue = e;
  }
}
