import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CallsPerHourNewGraphicComponent} from './calls-per-hour-new-graphic.component';
import {ChartsModule} from "ng2-charts";
import {CallsPersHour} from "../../models/callsPersHour";
import {Campaign} from "../../models/campaign";

describe('CallsPerHourNewGraphicComponent', () => {
  let component: CallsPerHourNewGraphicComponent;
  let fixture: ComponentFixture<CallsPerHourNewGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartsModule],
      declarations: [CallsPerHourNewGraphicComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsPerHourNewGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty calls per hour', () => {
    component.callsPerHour = [];
    component.ngOnChanges({callsPerHour: true});

    expect(component.chartData.length).toEqual(0);
    expect(component.labels.length).toEqual(24);

    for (let val of component.chartData) {
      // expect(val).toEqual(0);
    }
  });

  it('not empty calls per hour', () => {

    expect(component.chartData.length).toEqual(0);

    //instances of calls per hour and campaign
    let cp = new CallsPersHour("REAL_ESTATE",13,1.5,5,2);
    let c = new Campaign("REAL_ESTATE","Real Estate");


    component.callsPerHour = [cp];
    component.campaigns = [c];

    component.ngOnChanges({callsPerHour: true});

    //chartData when there are data (calls per hour)
    expect(component.chartData.length).toEqual(1);

    //labels are 24 (hours)
    expect(component.labels.length).toEqual(24);

    //when it push data
    expect(component.chartData[0].label).toEqual("Real Estate");
    expect(component.chartData[0].data[5]).toEqual(5);


  });


  it('two calls per hour same campaign', () => {

    expect(component.chartData.length).toEqual(0);

    //instances of calls per hour
    let cp = new CallsPersHour("REAL_ESTATE",13,1.5,5,2);
    let cp2 = new CallsPersHour("REAL_ESTATE",10,3,7,5);

    let c = new Campaign("REAL_ESTATE","Real Estate");


    component.callsPerHour = [cp, cp2];
    component.campaigns = [c];

    component.ngOnChanges({callsPerHour: true});

    //chartData when there are data (calls per hour)
    expect(component.chartData.length).toEqual(1);
    //
    // //labels are 24 (hours)
    expect(component.labels.length).toEqual(24);

    //when it push data: exists the campaign and push it in the correspondent position
    //one array
    expect(component.chartData[0].label).toEqual("Real Estate");
    expect(component.chartData[0].data[2]).toEqual(7);
    expect(component.chartData[0].data[5]).toEqual(5);

  });


  it('two calls per hour different campaign', () => {

    expect(component.chartData.length).toEqual(0);

    //instances of calls per hour
    let cp = new CallsPersHour("DIRECT",12,1,1,1);
    let cp2 = new CallsPersHour("INDIRECT", 14, 3,2,4);


    component.callsPerHour = [cp, cp2];

    //instances of Campaign
    let c = new Campaign("DIRECT","Direct");
    let c2 = new Campaign("INDIRECT","Indirect");


    component.campaigns = [c, c2];

    component.ngOnChanges({callsPerHour: true});

    //chartData when there are data (calls per hour) different campaign name
    expect(component.chartData.length).toEqual(2);
    //
    // //labels are 24 (hours)
    expect(component.labels.length).toEqual(24);

    // //when it push data: not exists the campaign and push it in the correspondent position
    expect(component.chartData[0].label).toEqual("Direct");
    expect(component.chartData[1].label).toEqual("Indirect");

    //two array
    expect(component.chartData[0].data[4]).toEqual(1);
    expect(component.chartData[1].data[6]).toEqual(2);


  });


  it('three calls per hour: two with same campaign, 1 different campaign', () => {

    expect(component.chartData.length).toEqual(0);

    //instances of calls per hour: 3 array
    let cp = new CallsPersHour("REAL_ESTATE",13,1.5,5,2);
    let cp2 = new CallsPersHour("REAL_ESTATE",10,2,7,3);
    let cp3 = new CallsPersHour("DIRECT",12,1,3,4);


    component.callsPerHour = [cp, cp2, cp3];

    //instances of Campaign: two different campaigns
    let c = new Campaign("REAL_ESTATE","Real Estate");
    let c2 = new Campaign("DIRECT","Direct");

    component.campaigns = [c, c2];

    component.ngOnChanges({callsPerHour: true});

    //chartData when there are data (calls per hour) 2 same campaign name 1 different
    expect(component.chartData.length).toEqual(2);

    //labels are 24 (hours)
    expect(component.labels.length).toEqual(24);

    //when it push data: not exists the campaign and push it in the correspondent position
    expect(component.chartData[0].label).toEqual("Real Estate");
    expect(component.chartData[1].label).toEqual("Direct");

    //two array: 1 with the different positions from total (Real Estate), another different with its
    //correspondent position (Direct)

    expect(component.chartData[0].data[2]).toEqual(7);
    expect(component.chartData[0].data[5]).toEqual(5);
    expect(component.chartData[1].data[4]).toEqual(3);

  });

});
