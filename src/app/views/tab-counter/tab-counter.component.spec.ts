import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabCounterComponent } from './tab-counter.component';
import {WaitingBackendComponent} from "../waiting-backend/waiting-backend.component";
import {By} from "@angular/platform-browser";

describe('TabCounterComponent', () => {
  let component: TabCounterComponent;
  let fixture: ComponentFixture<TabCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCounterComponent, WaitingBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });


  function setValues(data: Array<any>, searching: boolean){
    component.data = data;
    component.searching = searching;
    fixture.detectChanges();
  }

  function checkValues(length: number, isSearching: boolean, text){
    let span = fixture.debugElement.query(By.css("span")).nativeElement;
    if(isSearching){
      expect(span.children[0].localName).toEqual(text);
    }else{
      expect(span.innerText).toEqual(text);
    }
  }


  it('tab counter with data and not searching', () => {

    setValues(["data1", "data2", "data3"], false);
    checkValues(3, false, "3")

  });

  it('tab counter with no data and not searching', () => {

    setValues([], false);
    checkValues(0, false, "0")

  });

  it('tab counter with data and searching', () => {

    setValues(["data1"], true);
    checkValues(1, true, "waiting-backend")

  });

  it('tab counter with no data and searching', () => {

    setValues(null, true);
    checkValues(null, true, "waiting-backend")

  });

});
