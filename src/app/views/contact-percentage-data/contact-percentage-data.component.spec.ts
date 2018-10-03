import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPercentageDataComponent } from './contact-percentage-data.component';
import {ComponentLoaderFactory, PopoverConfig, PopoverModule, PositioningService} from "ngx-bootstrap";
import {ContactPercentageNewGraphicComponent} from "../contact-percentage-new-graphic/contact-percentage-new-graphic.component";
import {NgbModule, NgbTabsetConfig} from "@ng-bootstrap/ng-bootstrap";
import {ContactPercentageTableComponent} from "../contact-percentage-table/contact-percentage-table.component";
import {ChartsModule} from "ng2-charts";

describe('ContactPercentageDataComponent', () => {
  let component: ContactPercentageDataComponent;
  let fixture: ComponentFixture<ContactPercentageDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PopoverModule, NgbModule, ChartsModule ],
      declarations: [ ContactPercentageDataComponent, ContactPercentageNewGraphicComponent, ContactPercentageTableComponent ],
      providers: [ NgbTabsetConfig, PopoverConfig, ComponentLoaderFactory, PositioningService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPercentageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
