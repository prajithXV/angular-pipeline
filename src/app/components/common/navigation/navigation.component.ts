import {Component, ViewChildren, QueryList, ViewEncapsulation, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import 'jquery-slimscroll';
import {CiscoCommsService} from "../../../services/cisco-comms.service";
import {DataService} from "../../../services/data.service";
import {PublicUrls, UrlComponents} from "../../../routing-constants";
import {GlobalStateService} from "../../../services/global-state.service";
import {PopoverDirective} from "ngx-bootstrap";
import {HotkeysSubscriber} from "../../../general/hotkeys-subscriber";
import {environment} from "../../../../environments/environment";
import {MockCiscoCommsService} from "../../../services/mocks/mock-cisco-comms.service";
import {MenuStateService} from "../../../services/menu-state.service";
import {ROLE_STANDARD_CODES} from "../../../models/role";
import {TemporalStateServiceService} from "../../../services/temporal-state-service.service";

declare let $: any;
// import * as $ from 'jquery';

@Component({
  selector: 'navigation',
  host: {'(window:keydown)': 'hotkeys($event)'},
  styleUrls: ['../../../views/homeview.component.css'],
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent  implements OnInit, OnDestroy, AfterViewInit {
  routes = PublicUrls;
  tokens = UrlComponents;
  environment = environment;
  private _ciscoMock: MockCiscoCommsService;

  @ViewChildren(PopoverDirective) private _popovers: QueryList<PopoverDirective>;
  private _hkSubscription: HotkeysSubscriber = new HotkeysSubscriber();

  constructor(
    private _temporalStateService: TemporalStateServiceService,
    private _router: Router,
    private _menuState: MenuStateService,
    private _globalStateService: GlobalStateService,
    ciscoCommService: CiscoCommsService
  ) {
    this._ciscoMock = ciscoCommService as MockCiscoCommsService;
  }

  ngOnInit() {

    this._hkSubscription.startSubscription(this._globalStateService, () => this._popovers);
  }

  ngOnDestroy() {
    this._hkSubscription.endSubscritption();
  }




  ngAfterViewInit() {
    //for that this not change the value to event
    let me = this;

    $('#side-menu').metisMenu({
      toggle: false,

    }).on('show.metisMenu', function (event) {
      me._menuState.refreshStateMenu(event.target.id,true);

    }).on('hide.metisMenu',function (event) {
      me._menuState.refreshStateMenu(event.target.id,false);
    });

    if ($("body").hasClass('fixed-sidebar')) {
      $('.sidebar-collapse').slimscroll({
        height: '100%'

      })
    }
  }


  onMainPage(){
    this._temporalStateService.casesListInfo = null;
    this._temporalStateService.accountListInfo = null;
    this._temporalStateService.campaignListInfo = null;
  }

  //to know if has to be active or not
  isMenuActive(id:string){
    return this._menuState.getTypeById(id) === true;
  }

  activeRoute(routename: string): boolean {
    return this._router.url.split('/').indexOf(routename) > -1;

  }

  isAdmin() {
    return this._globalStateService.loggedAgent.isAdmin;
  }

  isManager() {
    return this._globalStateService.loggedAgent.isManager;
  }

  isSupervisor() {
    return this._globalStateService.loggedAgent.isSupervisor;
  }

  isTicklerAgent() {
    // return true;
    return this._globalStateService.loggedAgentHasRoleCode(ROLE_STANDARD_CODES.TICKLER_AGENT);
  }

  hotkeys(event){
    if (event.keyCode == 120 /*F9*/) {
      this._router.navigate([PublicUrls.main.url]);
      event.preventDefault();
    }
    if (event.keyCode == 118 /*F7*/) {
      this._router.navigate([PublicUrls.admin_users.url]);
      event.preventDefault();
    }
    if (event.keyCode == 117 /*F6*/) {
      this._router.navigate([PublicUrls.admin_campaigns.url]);
      event.preventDefault();
    }
  }

  isMockAllowed() {
    return !environment.production;
  }

  stateNotReady() {
    this._ciscoMock.sendStateNotReady();
  }

  stateReady() {
    this._ciscoMock.sendStateReady();
  }

  stateWorkReady() {
    this._ciscoMock.sendStateWorkReady();
  }

  incomingAlerting() {
    this._ciscoMock.sendIncomingAlerting();
  }

  incomingPickup() {
    this._ciscoMock.sendIncomingSpeaking()
  }

  incomingHangup() {
    this._ciscoMock.sendIncomingHangup();
  }

  outgoingInitiating() {
    this._ciscoMock.sendOutgoingInitiating();
  }

  outgoingCalling() {
    this._ciscoMock.sendOutgoingCalling();
  }

  outgoingSpeaking() {
    this._ciscoMock.sendOutgoingSpeaking();
  }

  outgoingHangup() {
    this._ciscoMock.sendOutgoingHangup();
  }

  outgoingDropped() {
    this._ciscoMock.sendOutgoingDropped()
  }

}
