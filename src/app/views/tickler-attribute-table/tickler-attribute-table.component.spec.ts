import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TicklerAttributeTableComponent } from './tickler-attribute-table.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {NewTicklerAttributeComponent} from "../new-tickler-attribute/new-tickler-attribute.component";
import {AttributeTypeToStringPipe} from "../../pipes/attribute-type-to-string.pipe";
import {SemaphoreComponent} from "../semaphore/semaphore.component";
import {CoinDateTransformPipe} from "../../pipes/coin-date-transform.pipe";
import {FormsModule} from "@angular/forms";
import {PopoverModule} from "ngx-bootstrap";


describe('TicklerAttributeTableComponent', () => {
  let component: TicklerAttributeTableComponent;
  let fixture: ComponentFixture<TicklerAttributeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, PopoverModule ],
      declarations: [ TicklerAttributeTableComponent, WaitingBackendComponent, NewTicklerAttributeComponent, AttributeTypeToStringPipe, SemaphoreComponent, CoinDateTransformPipe ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicklerAttributeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




});
