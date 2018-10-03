import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsPerHourDataComponent } from './calls-per-hour-data.component';
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";
import {CallsPerHourNewGraphicComponent} from "../calls-per-hour-new-graphic/calls-per-hour-new-graphic.component";
import {NgbModule, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {CallsPerHourTableComponent} from "../calls-per-hour-table/calls-per-hour-table.component";
import {ChartsModule} from "ng2-charts";

describe('CallsPerHourDataComponent', () => {
  let component: CallsPerHourDataComponent;
  let fixture: ComponentFixture<CallsPerHourDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PopoverModule, NgbModule, ChartsModule] ,
      declarations: [ CallsPerHourDataComponent, CallsPerHourNewGraphicComponent, CallsPerHourTableComponent ],
      providers: [ NgbTabsetConfig, PopoverConfig, ComponentLoaderFactory, PositioningService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsPerHourDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
