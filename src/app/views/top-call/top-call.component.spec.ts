import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCallComponent } from './top-call.component';
import {GlobalStateService} from "../../services/global-state.service";
import {HttpModule} from "@angular/http";
import {RouterTestingModule} from "@angular/router/testing";
import {Call, CallState, CallType} from "../../models/call";
import {TelephonePipe} from "../../pipes/telephone.pipe";
import {TemporalStateServiceService} from "../../services/temporal-state-service.service";


let globalStateServiceMock = {
  currentCall: new Call()
};

describe('TopCallComponent', () => {
  let component: TopCallComponent;
  let fixture: ComponentFixture<TopCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, RouterTestingModule ],
      declarations: [ TopCallComponent, TelephonePipe ],
      providers: [ {provide: GlobalStateService, useValue: globalStateServiceMock },  TemporalStateServiceService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCallComponent);
    component = fixture.componentInstance;

    let call = new Call();

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
