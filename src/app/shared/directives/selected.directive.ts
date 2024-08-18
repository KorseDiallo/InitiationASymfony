import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appSelected]'
})
export class SelectedDirective implements OnChanges {

  @Input() public appSelected!:boolean;
  @HostBinding('style.backgroundColor') public backgroundColor!:string;
  @HostBinding('style.fontWeight') public fontWeight!:string;
  @HostBinding('style.color') public color!:string;

  constructor() { }

  ngOnChanges(): void {
      if(this.appSelected){
        this.backgroundColor='var(--primary)';
        this.fontWeight='500';
        this.color='white';
      }else{
        this.backgroundColor='white';
        this.fontWeight='400';
        this.color='var(--text-regular)';
      }
  }

}
