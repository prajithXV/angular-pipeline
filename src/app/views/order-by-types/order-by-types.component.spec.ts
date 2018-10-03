import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderByTypesComponent } from './order-by-types.component';
import {FormsModule} from "@angular/forms";

describe('OrderByTypesComponent', () => {
  let component: OrderByTypesComponent;
  let fixture: ComponentFixture<OrderByTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ OrderByTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderByTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
