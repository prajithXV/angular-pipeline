import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";

@Component({
  selector: 'coin-number-input-errors',
  templateUrl: './coin-number-input-errors.component.html',
  styleUrls: ['./coin-number-input-errors.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CoinNumberInputErrorsComponent implements OnInit {
  @Input() host: CoinNumberInputComponent;

  constructor() { }

  ngOnInit() {
  }

}
