import { Component, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <p>Child Component: {{person.name}} lives at {{person.zipcode}}, Address: {{address}} </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildComponent implements OnChanges {
  @Input() person: { name: string, zipcode: number };
  address: String;

  constructor() {
    console.info({ 'Constructor Input Value': this.person }) // undefined
  }
  ngOnInit() {
    console.info({ 'ngOnInit Input Value': this.person })
    this.address = this.locateAddress(this.person.zipcode);
  }
  ngOnChanges(change) {
    if (change.person) {
      console.log(`Change detected, ngOnchanges() Triggered, Locate Address...`)
      this.address = this.locateAddress(this.person.zipcode);
    }
  }
  locateAddress(zipcode) {
    return this.randomAddress()
  }

  randomAddress() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

}
