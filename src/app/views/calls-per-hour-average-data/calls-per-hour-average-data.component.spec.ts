import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallsPerHourAverageDataComponent } from './calls-per-hour-average-data.component';
import {
  ComponentLoaderFactory, Ng2BootstrapModule, PopoverConfig, PopoverModule,
  PositioningService
} from "ngx-bootstrap";
import {CallsPerHourNewGraphicComponent} from "../calls-per-hour-new-graphic/calls-per-hour-new-graphic.component";
import {CallsPerHourAverageNewGraphicComponent} from "../calls-per-hour-average-new-graphic/calls-per-hour-average-new-graphic.component";
import {NgbModule, NgbTab, NgbTabsetConfig, NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import {CallsPerHourTableComponent} from "../calls-per-hour-table/calls-per-hour-table.component";
import {ChartsModule} from "ng2-charts";

describe('CallsPerHourAverageDataComponent', () => {
  let component: CallsPerHourAverageDataComponent;
  let fixture: ComponentFixture<CallsPerHourAverageDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PopoverModule,NgbModule, ChartsModule],
      declarations: [CallsPerHourAverageDataComponent,CallsPerHourAverageNewGraphicComponent, CallsPerHourTableComponent],
      providers: [NgbTabsetConfig, PopoverConfig, ComponentLoaderFactory, PositioningService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsPerHourAverageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
