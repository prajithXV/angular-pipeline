import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {GlobalStateService, GSSErrorCodes} from "../../services/global-state.service";
import {Router} from "@angular/router";
import {UFNotification, UserFeedbackService} from "../../services/user-feedback.service";
import {UFSeverity} from "../../services/ufseverity";
import {ToastsManager} from "ng2-toastr";
import { DataService } from "app/services/data.service";
import {environment} from "../../../environments/environment";
import {PublicUrls} from "../../routing-constants";
import {sneakMock} from "../../../environments/common-constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../homeview.component.css', './login.component.css']
})
export class LoginComponent implements OnInit {
  env = environment;

  user: string = "";
  pwd: string = "";
  ciscoUser: string = "";
  ext: string = "";
  disableExt = false;
  waitingResponse = false;

  sneakMock = sneakMock;

  constructor(
    private _router: Router,
    private _globalStateService: GlobalStateService,
    private _userFeedbackService: UserFeedbackService
  ) {
  }

  ngOnInit() {
    if (environment.ciscoOneExtension) {
      this.ciscoUser = environment.ciscoExtension;
      this.ext = environment.ciscoExtension;
      this.disableExt = true;
    }
  }

  login() {
    this.waitingResponse = true;
    this._globalStateService.login(this.user, this.pwd, this.ciscoUser, this.ext)
      .then(agent => {
        this._userFeedbackService.handleNotification(new UFNotification(0, `Welcome ${agent.completeName}!`, UFSeverity.info));
        this._router.navigate([PublicUrls.main.url]);
      })
      .catch(error => {
        let msg = "Error in login";
        switch(error) {
          case GSSErrorCodes.bad_credentials: msg = "Bad credentials";
        }
        this._userFeedbackService.handleNotification(new UFNotification(0, msg, UFSeverity.warn, error));
        this.waitingResponse = false;
      });
  }

  disableLogin() {
    return this.user.trim() == "" || this.pwd.trim() == "" || this.waitingResponse;
  }
}
