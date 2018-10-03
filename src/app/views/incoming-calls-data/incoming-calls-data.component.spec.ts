import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingCallsDataComponent } from './incoming-calls-data.component';
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";
import {IncomingCallsNewGraphicComponent} from "../incoming-calls-new-graphic/incoming-calls-new-graphic.component";
import {NgbModule, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {IncomingCallsTableComponent} from "../incoming-calls-table/incoming-calls-table.component";
import {ChartsModule} from "ng2-charts";

describe('IncomingCallsDataComponent', () => {
  let component: IncomingCallsDataComponent;
  let fixture: ComponentFixture<IncomingCallsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PopoverModule, NgbModule, ChartsModule ],
      declarations: [ IncomingCallsDataComponent, IncomingCallsNewGraphicComponent, IncomingCallsTableComponent ],
      providers: [ NgbTabsetConfig, PopoverConfig, ComponentLoaderFactory, PositioningService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingCallsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
