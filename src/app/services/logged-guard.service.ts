import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import {GlobalStateService} from "./global-state.service";
import {PublicUrls} from "../routing-constants";
import {ROLE_STANDARD_CODES} from "../models/role";

@Injectable()
export class LoggedGuard implements CanActivate {

  constructor(protected _globalStateService: GlobalStateService, protected _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this._globalStateService.loggedAgent != null) {
      // console.log("Allowed");
      return true;
    }
    // console.log("Not allowed");
    this._router.navigate([PublicUrls.login.url]);
    return false;
  }

}

@Injectable()
export class AdminGuard extends LoggedGuard {
  constructor(globalStateService: GlobalStateService, router: Router) {
    super(globalStateService, router);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // First delegate in the super
    if (!super.canActivate(route)) {
      return false;
    }

    // Check admin user
    if (this._globalStateService.loggedAgent.isAdmin) {
      // console.log("Allowed");
      return true;
    }
    // console.log("Not allowed");
    this._router.navigate([PublicUrls.main.url]);
    return false;
  }
}

@Injectable()
export class AdminMagerGuard extends LoggedGuard {
  constructor(globalStateService: GlobalStateService, router: Router) {
    super(globalStateService, router);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // First delegate in the super
    if (!super.canActivate(route)) {
      return false;
    }

    // Check admin user
    if (
      this._globalStateService.loggedAgent.isAdmin ||
      this._globalStateService.loggedAgent.isManager
    ) {
      // console.log("Allowed");
      return true;
    }
    // console.log("Not allowed");
    this._router.navigate([PublicUrls.main.url]);
    return false;
  }
}

@Injectable()
export class AdminMagerSupervisorGuard extends LoggedGuard {
  constructor(globalStateService: GlobalStateService, router: Router) {
    super(globalStateService, router);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // First delegate in the super
    if (!super.canActivate(route)) {
      return false;
    }

    // Check admin user
    if (
      this._globalStateService.loggedAgent.isAdmin ||
      this._globalStateService.loggedAgent.isManager ||
      this._globalStateService.loggedAgent.isSupervisor
    ) {
      // console.log("Allowed");
      return true;
    }
    // console.log("Not allowed");
    this._router.navigate([PublicUrls.main.url]);
    return false;
  }
}

@Injectable()
export class TicklerAgentGuard extends LoggedGuard {
  constructor(globalStateService: GlobalStateService, router: Router) {
    super(globalStateService, router);
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // First delegate in the super
    console.log("Can activate?");
    if (!super.canActivate(route)) {
      return false;
    }

    // Check role
    if (
      this._globalStateService.loggedAgentHasRoleCode(ROLE_STANDARD_CODES.TICKLER_AGENT)
    ) {
      console.log("Allowed");
      return true;
    }
    console.log("Not allowed");
    this._router.navigate([PublicUrls.main.url]);
    return false;
  }
}

@Injectable()
export class NotLoggedGuard implements CanActivate {

  constructor(private _globalStateService: GlobalStateService, private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this._globalStateService.loggedAgent == null) {
      // console.log("Allowed");
      return true;
    }
    // console.log("Not allowed");
    this._router.navigate([PublicUrls.main.url]);
    return false;
  }

}
