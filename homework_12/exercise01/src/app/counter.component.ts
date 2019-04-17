import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
  <p>
  <button (click)="doCalculate(true)">+</button>
  {{counterValue}}
  <button  (click)="doCalculate(false)">-</button>
  </p>
  `,
  styles:[]
})
export class CounterComponent implements OnInit,OnChanges {
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log("-----------------"+JSON.stringify(changes))

  }
  @Input() set counter(val:number){
      this.counterValue = val; 
  }
  counterValue:number = 0;
  constructor() { }
  doCalculate(inc:boolean){
    if(inc){
      this.counterValue++;
    } else{
      this.counterValue--;
    }
    this.counterChange.emit(this.counterValue);
  }
  ngOnInit() {
    // this.counterValue = this.counter;
    this.counterChange.emit(this.counterValue);
  }
  @Output("counterChange") counterChange:EventEmitter<number> = new EventEmitter();

}
