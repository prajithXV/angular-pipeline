import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'semaphore',
  templateUrl: './semaphore.component.html',
  styleUrls: ['./semaphore.component.css']
})
export class SemaphoreComponent implements OnInit {
  @Input() value: boolean;

  constructor() { }

  ngOnInit() {
  }

}
