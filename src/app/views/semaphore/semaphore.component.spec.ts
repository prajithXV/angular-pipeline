import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemaphoreComponent } from './semaphore.component';
import {By} from "@angular/platform-browser";

describe('SemaphoreComponent', () => {
  let component: SemaphoreComponent;
  let fixture: ComponentFixture<SemaphoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SemaphoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SemaphoreComponent);
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


  function checkValue(isCircle: boolean, isCircleThin: boolean){
    let icon = fixture.debugElement.query(By.css("i"));
    expect(icon.classes["fa-circle"]).toEqual(isCircle);
    expect(icon.classes["fa-circle-thin"]).toEqual(isCircleThin);

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
