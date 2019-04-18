import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: `
    <p>
      THis is home page!
    </p>
  `,
  styles: []
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
