import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
declare var jQuery:any;

@Component({
  selector: 'iboxtools',
  templateUrl: 'iboxtools.template.html'
})
export class IboxtoolsComponent implements OnInit {
  @Input() startClosed: boolean;

  @ViewChild('thea') thea: ElementRef;

  private elem: HTMLElement = null;
  private _isOpen = true;

  ngOnInit() {
    if (this.startClosed) {
      this.close();
    }
  }

  private doClick() {
    if (!this.elem) {
      this.elem = this.thea.nativeElement as HTMLElement;
    }
    this.elem.click();
  }

  public toggle() {
    let el: HTMLElement = this.thea.nativeElement as HTMLElement;
    el.click();
  }

  public open() {
    if (!this._isOpen) {
      this.doClick();
    }
  }

  public close() {
    if (this._isOpen) {
      this.doClick();
    }
  }

  public collapse(e):void {
    this._isOpen = !this._isOpen;
    e.preventDefault();
    let ibox = jQuery(e.target).closest('div.ibox');
    let button = jQuery(e.target.tagName=="A" ? e.target.firstElementChild : e.target).closest('i');
    // if (!button.is("i")) {
    //   button = button.firstElementChild;
    // }
    let content = ibox.children('.ibox-content');
    content.slideToggle(200);
    button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
    ibox.toggleClass('').toggleClass('border-bottom');
    setTimeout(function () {
      ibox.resize();
      ibox.find('[id^=map-]').resize();
    }, 50);

  }

  get isOpen() {
    return this._isOpen;
  }
}
