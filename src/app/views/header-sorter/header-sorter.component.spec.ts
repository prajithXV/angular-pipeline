import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSorterComponent } from './header-sorter.component';

describe('HeaderSorterComponent', () => {
  let component: HeaderSorterComponent;
  let fixture: ComponentFixture<HeaderSorterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSorterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
