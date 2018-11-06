import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {UFSeverity} from "./ufseverity";
import {ToastrService} from "ngx-toastr";

export class UFNotification {
  constructor(private _code: number, private _message: string, private _severity = UFSeverity.info, private _innerError?: any) {
  }

  get code () {return this._code;}
  get message () {return this._message;}
  get severity () {return this._severity;}
  get innerError () {return this._innerError;}
}

@Injectable()
export class UserFeedbackService {
  private _toastOptions = {positionClass: 'toast-top-left'/*, dismiss: 'click'*/};

  constructor(private _toastr: ToastrService) {
  }

  handleNotification(error: UFNotification) {
    // Log if configured
    if (error.severity >= environment.minSeverityErrorToConsole) {
      console.log("Notification received: ");
      console.log(error);
    }
    // Toast non debug errors
    if (error.severity > UFSeverity.debug) {
      this.toast(error);
    }
  }

  handleSuccess(msg: string) {
    return this.handleNotification(new UFNotification(0, msg, UFSeverity.success));
  }

  handleError(msg: string, innerError?:any) {
    return this.handleNotification(new UFNotification(0, msg, UFSeverity.error, innerError));
  }

  private toast(error: UFNotification) {
    let msg = error.message;
    // If inner error exists, has a body and a message use it as message
    if (error.innerError && error.innerError.error && error.innerError.error.Message) {
      msg += ": " + error.innerError.error.Message;
    }
    // Show the toast
    switch(error.severity) {
      case UFSeverity.info: this._toastr.info(msg, null, this._toastOptions); break;
      case UFSeverity.success: this._toastr.success(msg, null, this._toastOptions); break;
      case UFSeverity.warn: this._toastr.warning(msg, null, this._toastOptions); break;
      case UFSeverity.error:  this._toastr.error(msg, null, this._toastOptions); break;
    }
  }
}
