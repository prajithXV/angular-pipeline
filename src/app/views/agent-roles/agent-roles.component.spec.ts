import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRolesComponent } from './agent-roles.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {TickCrossComponent} from "../tick-cross/tick-cross.component";

describe('AgentRolesComponent', () => {
  let component: AgentRolesComponent;
  let fixture: ComponentFixture<AgentRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentRolesComponent, WaitingBackendComponent, TickCrossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
