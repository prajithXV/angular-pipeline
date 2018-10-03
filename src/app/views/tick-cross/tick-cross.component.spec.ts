import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickCrossComponent } from './tick-cross.component';
import {By} from "@angular/platform-browser";

describe('TickCrossComponent', () => {
  let component: TickCrossComponent;
  let fixture: ComponentFixture<TickCrossComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickCrossComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  function setValue(value:boolean){
    component.value = value;
    fixture.detectChanges();
  }


 function checkValue(isCheckIcon: boolean, isFaIcon: boolean){
   let icon = fixture.debugElement.query(By.css("i"));
   expect(icon.classes["fa-check"]).toEqual(isCheckIcon);
   expect(icon.classes["fa-times"]).toEqual(isFaIcon);

 }

  it('true value', () => {
    setValue(true);
    checkValue(true, false);

  });

  it('false value', () => {
    setValue(false);
    checkValue(false, true);

  });

});
