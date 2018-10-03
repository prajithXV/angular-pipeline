import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAttributeEditionComponent } from './campaign-attribute-edition.component';
import {FormsModule} from "@angular/forms";
import {CoinNumberInputComponent} from "../coin-number-input/coin-number-input.component";
import {CoinDateInputComponent} from "../coin-date-input/coin-date-input.component";
import {CoinNumberInputErrorsComponent} from "../coin-number-input-errors/coin-number-input-errors.component";
import {CampaignAttribute} from "../../models/campaign-attribute";
import {DatepickerComponent} from "../datepicker/datepicker.component";
import {OwlDateTimeModule} from "ng-pick-datetime";
import {OwlMomentDateTimeModule} from "ng-pick-datetime-moment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AttributeType} from "../../models/attribute";

describe('CampaignAttributeEditionComponent', () => {
  let component: CampaignAttributeEditionComponent;
  let fixture: ComponentFixture<CampaignAttributeEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, OwlDateTimeModule, OwlMomentDateTimeModule, BrowserAnimationsModule ],
      declarations: [ CampaignAttributeEditionComponent, CoinNumberInputComponent, CoinDateInputComponent, CoinNumberInputErrorsComponent, DatepickerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAttributeEditionComponent);
    component = fixture.componentInstance;

    let cat = new CampaignAttribute();
    cat.type = AttributeType.number;
    component.attribute = cat;


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
