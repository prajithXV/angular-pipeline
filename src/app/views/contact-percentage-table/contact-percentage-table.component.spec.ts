import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPercentageTableComponent } from './contact-percentage-table.component';

describe('ContactPercentageTableComponent', () => {
  let component: ContactPercentageTableComponent;
  let fixture: ComponentFixture<ContactPercentageTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactPercentageTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPercentageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
