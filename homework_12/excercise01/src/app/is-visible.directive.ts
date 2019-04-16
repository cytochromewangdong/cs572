import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appIsVisible]'
})
export class IsVisibleDirective implements OnInit{
 

  constructor(private element:ElementRef, private render2:Renderer2) { }
  @Input() appIsVisible:boolean;
  ngOnInit(): void {
    console.log(this.appIsVisible);

    if(!this.appIsVisible)
    {
      this.render2.setStyle(this.element.nativeElement, "display","none");
    }

    console.log(this.appIsVisible);

  }
}
