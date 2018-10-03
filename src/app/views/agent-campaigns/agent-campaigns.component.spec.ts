import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCampaignsComponent } from './agent-campaigns.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {TickCrossComponent} from "../tick-cross/tick-cross.component";

describe('AgentCampaignsComponent', () => {
  let component: AgentCampaignsComponent;
  let fixture: ComponentFixture<AgentCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentCampaignsComponent, WaitingBackendComponent, TickCrossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
