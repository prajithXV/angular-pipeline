import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-options',
  templateUrl: './main-options.component.html',
  styleUrls: ['../homeview.component.css', './main-options.component.css']
})
export class MainOptionsComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  nextCall() {
    this._router.navigate(['app','account']);
  }

  search() {
    this._router.navigate(['app','search']);
  }
}

