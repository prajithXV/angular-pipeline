import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingBackendComponent } from './waiting-backend.component';

describe('WaitingBackendComponent', () => {
  let component: WaitingBackendComponent;
  let fixture: ComponentFixture<WaitingBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
