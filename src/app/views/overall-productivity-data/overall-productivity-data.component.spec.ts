import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallProductivityDataComponent } from './overall-productivity-data.component';
import {CoinPercentagePipe} from "../../pipes/coin-percentage-pipe.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";

describe('OverallProductivityDataComponent', () => {
  let component: OverallProductivityDataComponent;
  let fixture: ComponentFixture<OverallProductivityDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverallProductivityDataComponent, CoinPercentagePipe, WaitingBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallProductivityDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
