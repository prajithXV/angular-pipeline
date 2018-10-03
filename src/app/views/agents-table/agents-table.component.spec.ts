import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AgentsTableComponent} from "./agents-table.component";
import {CoinDatePipe} from "../../pipes/coin-date.pipe";
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {TickCrossComponent} from "../tick-cross/tick-cross.component";
import {SemaphoreComponent} from "../semaphore/semaphore.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";


describe('AgentsTableComponent', () => {
  let component: AgentsTableComponent;
  let fixture: ComponentFixture<AgentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsTableComponent, CoinDatePipe,WaitingBackendComponent, TickCrossComponent, SemaphoreComponent, CoinDateTransformPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
