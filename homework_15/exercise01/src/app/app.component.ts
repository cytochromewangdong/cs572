import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <h1>Data Driven Form</h1>
        <app-data-driven></app-data-driven>
        <hr>
      </div>
    </div>
  </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'exercise01';
}
