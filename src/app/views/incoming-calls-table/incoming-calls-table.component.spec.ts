import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IncomingCallsTableComponent} from './incoming-calls-table.component';
import {IncomingCalls} from "../../models/incomingCalls";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";


describe('IncomingCallsTableComponent', () => {
  let component: IncomingCallsTableComponent;
  let fixture: ComponentFixture<IncomingCallsTableComponent>;
  let de: DebugElement;
  let el: HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IncomingCallsTableComponent],


    })

      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingCallsTableComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();


  });


  it('empty incoming calls and not visible', () => {

    //instances of incoming calls
    let ic = new IncomingCalls(null, null);

    //not incoming calls and table is hidden
    component.incomingCalls = [];
    component.visibleTable = false;

    expect(component.incomingCalls.length).toEqual(0);
    expect(component.visibleTable).toEqual(false);

    fixture.detectChanges();

  });


  it('empty incoming calls and visible', () => {

    //instances of incoming calls
    let ic = new IncomingCalls(null, null);

    //not incoming calls and is table is visible
    component.incomingCalls = [];
    component.visibleTable = true;

    //not incoming calls and table is visible
    expect(component.incomingCalls.length).toEqual(0);
    expect(component.visibleTable).toEqual(true);

    fixture.detectChanges();

  });


  it('not empty incoming calls and visible', () => {

    //instances of incoming calls
    let ic = new IncomingCalls(12, 1);

    //there are 1 incoming calls data and table visible
    component.incomingCalls = [ic];
    component.visibleTable = true;

    fixture.detectChanges();

    //table
    let ta = fixture.debugElement.query(By.css('table')).nativeElement;

    //tr of the table --> search its children (td)
    let td = fixture.debugElement.query(By.css('tbody tr')).children.map(e => e.nativeElement);


    //expect table to be truth
    expect(ta).toBeTruthy();

    //there are incomingCalls
    expect(component.incomingCalls.length).toEqual(1);

    //children tr
    expect(td.length).toBe(2);


    //expected data table

    /*expect tr children (tbody):
   *
   * <tr>
   *     <td>12</td>
   *     <td>1</td>
   * </tr>
   *
   * */

    expect(td[0].innerText.trim()).toEqual('12');
    expect(td[1].innerText).toEqual('1');

  });

  it('two incoming calls different hour and visible', () => {

    //instances of incoming calls
    let ic = new IncomingCalls(12, 1);
    let ic2 = new IncomingCalls(10, 5);

    //there are 2 incoming calls data and table is visible
    component.incomingCalls = [ic, ic2];
    component.visibleTable = true;

    fixture.detectChanges();

    //table
    let ta = fixture.debugElement.query(By.css('table')).nativeElement;

    //tbody of the table --> search its children (tr)
    let tr = fixture.debugElement.query(By.css('tbody')).children.map(e => e.nativeElement);

    //expect table to be truth
    expect(ta).toBeTruthy();

    //there are 2 incomingCalls
    expect(component.incomingCalls.length).toEqual(2);

    //there are 2 tr
    expect(tr.length).toBe(2);

    //every tr has 2 children
    expect(tr[0].children.length).toBe(2);
    expect(tr[1].children.length).toBe(2);


    //expected data table

    /*expect tr children (tbody):
   *
   * <tr>
   *     <td>12</td>
   *     <td>1</td>
   * </tr>
   *
   *
   *  <tr>
   *     <td>10</td>
   *     <td>5</td>
   * </tr>
   *
   * */
    expect(tr[0].children[0].innerText.trim()).toEqual('12');
    expect(tr[0].children[1].innerText).toEqual('1');

    expect(tr[1].children[0].innerText.trim()).toEqual('10');
    expect(tr[1].children[1].innerText).toEqual('5');

  });


  it('two incoming calls same hour and visible', () => {

    //instances of incoming calls --> same hour
    let ic = new IncomingCalls(12, 1);
    let ic2 = new IncomingCalls(12, 5);

    //there are 2 incoming calls and table is visible
    component.incomingCalls = [ic, ic2];
    component.visibleTable = true;

    fixture.detectChanges();

    //table
    let ta = fixture.debugElement.query(By.css('table')).nativeElement;

    //tbody of the table --> search its children (tr)
    let tr = fixture.debugElement.query(By.css('tbody')).children.map(e => e.nativeElement);

    //expect table to be truth
    expect(ta).toBeTruthy();

    //there are 2 incomingCalls
    expect(component.incomingCalls.length).toEqual(2);

    //there are 2 tr
    expect(tr.length).toBe(2);

    //every tr has 2 children
    expect(tr[0].children.length).toBe(2);
    expect(tr[1].children.length).toBe(2);


    //expected data table

    /*expect tr children (tbody):
   *
   * <tr>
   *     <td>12</td>
   *     <td>1</td>
   * </tr>
   *
   * <tr>
   *     <td>12</td>
   *     <td>5</td>
   * </tr>
   *
   *
   * */
    expect(tr[0].children[0].innerText.trim()).toEqual('12');
    expect(tr[0].children[1].innerText).toEqual('1');

    expect(tr[1].children[0].innerText.trim()).toEqual('12');
    expect(tr[1].children[1].innerText).toEqual('5');

  });


  it('three incoming calls and visible', () => {

    //instances of incoming calls
    let ic = new IncomingCalls(12, 1);
    let ic2 = new IncomingCalls(9, 7);
    let ic3 = new IncomingCalls(11, 8);

    //there are 3 incoming calls and the table is visible
    component.incomingCalls = [ic, ic2, ic3];
    component.visibleTable = true;

    fixture.detectChanges();

    //table
    let ta = fixture.debugElement.query(By.css('table')).nativeElement;

    //tbody of the table --> search its children (tr)
    let tr = fixture.debugElement.query(By.css('tbody')).children.map(e => e.nativeElement);

    //expect table to be truth
    expect(ta).toBeTruthy();

    //there are 3 incomingCalls
    expect(component.incomingCalls.length).toEqual(3);

    //there are 3 tr
    expect(tr.length).toBe(3);

    //every tr has 2 children
    expect(tr[0].children.length).toBe(2);
    expect(tr[1].children.length).toBe(2);
    expect(tr[2].children.length).toBe(2);


    //expected data table

    /*expect tr children (tbody):
   *
   * <tr>
   *     <td>12</td>
   *     <td>1</td>
   * </tr>
   *
   *
   *  <tr>
   *     <td>9</td>
   *     <td>7</td>
   * </tr>
   *
   *
   *
   *  <tr>
   *     <td>11</td>
   *     <td>8</td>
   * </tr>
   *
   * */
    expect(tr[0].children[0].innerText.trim()).toEqual('12');
    expect(tr[0].children[1].innerText).toEqual('1');

    expect(tr[1].children[0].innerText.trim()).toEqual('9');
    expect(tr[1].children[1].innerText).toEqual('7');

    expect(tr[2].children[0].innerText.trim()).toEqual('11');
    expect(tr[2].children[1].innerText).toEqual('8');

  });


});



