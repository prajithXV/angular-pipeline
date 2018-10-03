import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingCallsNewGraphicComponent } from './incoming-calls-new-graphic.component';
import {ChartsModule} from "ng2-charts";
import {IncomingCalls} from "../../models/incomingCalls";

describe('IncomingCallsNewGraphicComponent', () => {
  let component: IncomingCallsNewGraphicComponent;
  let fixture: ComponentFixture<IncomingCallsNewGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ChartsModule ],
      declarations: [ IncomingCallsNewGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingCallsNewGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty incoming calls', () =>{
    component.incomingCalls = [];
    component.ngOnChanges({incomingCalls: true});

    expect(component.chartData.length).toEqual(1);
    expect(component.chartData[0].data.length).toEqual(10);
    for (let val of component.chartData[0].data) {
      expect(val).toEqual(0);
    }
  });

  it('not empty incoming calls', () =>{
    expect(component.chartData[0].data.includes(1)).toBeFalsy();

    let ic = new IncomingCalls( 12,1);

    component.incomingCalls = [ic];

    component.ngOnChanges({incomingCalls: true});

    expect(component.chartData.length).toEqual(1);
    expect(component.chartData[0].data.length).toEqual(10);
    expect(component.chartData[0].data[4]).toEqual(1);


  });


  it('three incoming calls', () =>{
    expect(component.chartData[0].data.includes(1)).toBeFalsy();

    let ic = new IncomingCalls(12,5);
    let ic2 = new IncomingCalls(9,7);
    let ic3 = new IncomingCalls(14,10);

    component.incomingCalls = [ic,ic2, ic3];

    component.ngOnChanges({incomingCalls: true});

    expect(component.chartData.length).toEqual(1);
    expect(component.chartData[0].data.length).toEqual(10);
    expect(component.chartData[0].data[4]).toEqual(5);
    expect(component.chartData[0].data[1]).toEqual(7);
    expect(component.chartData[0].data[6]).toEqual(10);

  });
});

