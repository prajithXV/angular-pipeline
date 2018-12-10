import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutodialConsentModalComponent } from './autodial-consent-modal.component';

describe('AutodialConsentModalComponent', () => {
  let component: AutodialConsentModalComponent;
  let fixture: ComponentFixture<AutodialConsentModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutodialConsentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutodialConsentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
