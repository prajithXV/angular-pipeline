import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'waiting-backend',
  // template: 'Roda',
  template: '<i class="fa fa-spinner fa-pulse fa-fw"></i>',
  styleUrls: ['./waiting-backend.component.css']
})
export class WaitingBackendComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
