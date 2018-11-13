import {Component, OnInit} from '@angular/core';
import {BackendCommsService} from "app/services/backend-comms.service";
import {GlobalStateService} from "./services/global-state.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  host: {'(window:keydown)': 'hotkeys($event)'},
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private _globalStateService: GlobalStateService,
    private _backendCommsService: BackendCommsService
    )
  {
  }

  ngOnInit() {
    this._backendCommsService.setGlobalStateService(this._globalStateService);
  }

  hotkeys(event){
    if (!event.altKey && ! event.ctrlKey && !event.shiftKey && event.keyCode == 121 /* F10 */) {
      this._globalStateService.toggleHotkeyPopoversVisibility();
      event.preventDefault();
    }
  }
}
