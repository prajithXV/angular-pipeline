import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicklerProcessTableComponent } from './tickler-process-table.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";

describe('TicklerProcessTableComponent', () => {
  let component: TicklerProcessTableComponent;
  let fixture: ComponentFixture<TicklerProcessTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicklerProcessTableComponent, WaitingBackendComponent, CoinDateTransformPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicklerProcessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
