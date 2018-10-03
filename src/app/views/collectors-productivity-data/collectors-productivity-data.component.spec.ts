import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CollectorsProductivityDataComponent} from "./collectors-productivity-data.component";
import {CoinFixedNumber, CoinPercentagePipe} from "../../pipes/coin-percentage-pipe.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {CollectorProductivityRecord} from "../../models/collector-productivity-record";

describe('CollectorsProductivityComponent', () => {
  let component: CollectorsProductivityDataComponent;
  let fixture: ComponentFixture<CollectorsProductivityDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectorsProductivityDataComponent, CoinFixedNumber, CoinPercentagePipe, WaitingBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectorsProductivityDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();




  });



});
