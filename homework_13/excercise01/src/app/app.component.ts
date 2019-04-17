import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`<h1 [appIsVisible]="a">I am visible</h1>
            <div appMakeBigger> font Size Check</div>
            <h2  [appIsVisible]="b">I am invisible</h2><div><app-smart [data]="data"></app-smart></div>
            `,
  styles:[]
})
export class AppComponent {
  title = 'excercise01';
  a = true;
  b = false;
  data=["1","2","this is a test", new Date()];
}
