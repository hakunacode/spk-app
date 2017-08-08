import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'elastic-textarea',
  inputs: ['placeholder', 'lineHeight'],
  templateUrl: 'elastic-textarea.html'
})
export class ElasticTextareaComponent {
  @ViewChild('ionTxtArea') ionTxtArea:any;

  public txtArea:any;
  public content:string;
  public lineHeight:string;
  public placeholder:string;

  constructor() {
    this.content = "";
    this.lineHeight = "22px";
  }

  public ngAfterViewInit(){
    this.txtArea = this.ionTxtArea._elementRef.nativeElement.children[0];
    this.txtArea.style.height = this.lineHeight + "px";
    this.txtArea.style.resize = 'none';
  }

  public onChange(newValue){
    if (this.txtArea.scrollHeight < 100) {
      this.txtArea.style.height = this.lineHeight + "px";
      this.txtArea.style.height =  this.txtArea.scrollHeight + "px";
    }
  }

  public clearInput(){
    this.content = "";
    this.txtArea.style.height = this.lineHeight + "px";
  }

  public setFocus(){
    this.ionTxtArea.setFocus();
  }
}
