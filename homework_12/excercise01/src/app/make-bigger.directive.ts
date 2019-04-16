import { Directive, ElementRef, Renderer2, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appMakeBigger]'
})
export class MakeBiggerDirective implements OnInit{
  ngOnInit(): void {
    this.render2.setStyle(this.element.nativeElement, "user-select", "none");
  }
  constructor(private element:ElementRef, private render2:Renderer2) { }
  @HostListener("dblclick") dblClick(){
    // console.log(this.fontSize)
    
    // console.log();
    //this.fontSize = this.fontSize + 2;
    let sSize = window.getComputedStyle(this.element.nativeElement,null).getPropertyValue('font-size');
    // console.log(sSize)
    let fontSize = parseFloat(sSize)+2; 
    // now you have a proper float for the font size (yes, it can be a float, not just an integer)
    // this.element.nativeElement.style.fontSize = (fontSize + 2) + 'px';
    // console.log(fontSize)
    this.render2.setStyle(this.element.nativeElement, "font-size", fontSize+"px");
    // console.log("-----"+fontSize)
  }

}
