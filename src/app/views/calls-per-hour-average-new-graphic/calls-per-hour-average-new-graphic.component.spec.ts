import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CallsPerHourAverageNewGraphicComponent} from './calls-per-hour-average-new-graphic.component';
import {ChartsModule} from "ng2-charts";
import {Campaign} from "../../models/campaign";
import {CallsPersHour} from "../../models/callsPersHour";

describe('CallsPerHourAverageNewGraphicComponent', () => {
  let component: CallsPerHourAverageNewGraphicComponent;
  let fixture: ComponentFixture<CallsPerHourAverageNewGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ChartsModule],
      declarations: [CallsPerHourAverageNewGraphicComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallsPerHourAverageNewGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let _params: any;

  function newParams(params: any){
    return _params = new params();
  }

  function setCallsPerHourValues(campaignCode: string, hour: number, average: number, total: number, agentsCount: number ){
    _params.campaignCode = campaignCode;
    _params.hour = hour;
    _params.average = average;
    _params.total = total;
    _params.agentsCount = agentsCount;
  }

  function setCampaignValues(code: string, name: string){
    _params.code = code;
    _params.name = name;
  }

  function setParams(params){
    _params = params;
  }

  function setCallsPerHourToComponent(params){
    component.callsPerHour = params;
  }

  function setCampaignsToComponent(params){
    component.campaigns = params;
  }


  function callsToFunctions(){
    component.ngOnChanges({callsPerHour: true});
  }

  function checkChartDataLength(length: number){
    expect(component.chartData.length).toEqual(length);
  }

  function checkLabelsLength(length: number){
    expect(component.labels.length).toEqual(length);
  }


  it('empty calls per hour average', () => {
    let cp = [];
    setCallsPerHourToComponent(cp);
    callsToFunctions();
    expect(component.chartData.length).toEqual(0);
    checkLabelsLength(24);
    for (let val of component.chartData) {
      // expect(val).toEqual(0);
    }
  });


  it('not empty calls per hour average', () => {

    checkChartDataLength(0);
    //instances of calls per hou
    let cp = newParams(CallsPersHour);
    setParams(cp);
    setCallsPerHourValues("REAL_ESTATE",13,2.5,5,2);
    setCallsPerHourToComponent([cp]);

    //instances of Campaign
    let c = newParams(Campaign);
    setParams(c);
    setCampaignValues("REAL_ESTATE","Real Estate");
    setCampaignsToComponent([c]);

    callsToFunctions();

    //chartData when there are data (calls per hour)
    checkChartDataLength(1);

    //labels are 24 (hours)
    checkLabelsLength(24);

    //when it push data
    expect(component.chartData[0].label).toEqual("Real Estate");
    expect(component.chartData[0].data[5]).toEqual(2.5);


  });

  it('two calls per hour average same campaign', () => {

    checkChartDataLength(0);

    //instances of calls per hour
    let cp = newParams(CallsPersHour);
    setParams(cp);
    setCallsPerHourValues("REAL_ESTATE",13,2,8,2);

    let cp2 = newParams(CallsPersHour);
    setParams(cp2);
    setCallsPerHourValues("REAL_ESTATE",10,1.5,7,3);
    setCallsPerHourToComponent([cp, cp2]);

    //instances of Campaign
    let c = newParams(Campaign);
    setParams(c);
    setCampaignValues("REAL_ESTATE","Real Estate");
    setCampaignsToComponent([c]);


    callsToFunctions();

    //chartData when there are data (calls per hour)
    checkChartDataLength(1);
    //
    // //labels are 24 (hours)
    checkLabelsLength(24);

    // //when it push data: exists the campaign and push it in the correspondent position
    //one array
    expect(component.chartData[0].label).toEqual("Real Estate");
    expect(component.chartData[0].data[2]).toEqual(1.5);
    expect(component.chartData[0].data[5]).toEqual(2);


  });

  it('two calls per hour average different campaign', () => {

    checkChartDataLength(0);

    //instances of calls per hour
    let cp = newParams(CallsPersHour);
    setParams(cp);
    setCallsPerHourValues("DIRECT",12,3,5,3);

    let cp2 = newParams(CallsPersHour);
    setParams(cp2);
    setCallsPerHourValues("INDIRECT",14,2.5,7,2);
    setCallsPerHourToComponent([cp, cp2]);

    //instances of Campaign
    let c = newParams(Campaign);
    setParams(c);
    setCampaignValues("DIRECT","Direct");

    let c2 = newParams(Campaign);
    setParams(c2);
    setCampaignValues("INDIRECT","Indirect");
    setCampaignsToComponent([c, c2]);

    callsToFunctions();

    //chartData when there are data (calls per hour) different campaign name
    checkChartDataLength(2);
    //
    // //labels are 24 (hours)
    checkLabelsLength(24);

    // //when it push data: not exists the campaign and push it in the correspondent position
    expect(component.chartData[0].label).toEqual("Direct");
    expect(component.chartData[1].label).toEqual("Indirect");

    //two array
    expect(component.chartData[0].data[4]).toEqual(3);
    expect(component.chartData[1].data[6]).toEqual(2.5);


  });

  it('three calls per hour average: two with same campaign, 1 different campaign', () => {

    checkChartDataLength(0);

    //instances of calls per hour: 3 array
    let cp = newParams(CallsPersHour);
    setParams(cp);
    setCallsPerHourValues("REAL_ESTATE",13,4,10,3);

    let cp2 = newParams(CallsPersHour);
    setParams(cp2);
    setCallsPerHourValues("REAL_ESTATE",10,5,12,1);

    let cp3 = newParams(CallsPersHour);
    setParams(cp3);
    setCallsPerHourValues("DIRECT",12,7,15,4);

    setCallsPerHourToComponent([cp, cp2, cp3]);

    //instances of Campaign: two different campaigns

    let c = newParams(Campaign);
    setParams(c);
    setCampaignValues("REAL_ESTATE","Real Estate");

    let c2 = newParams(Campaign);
    setParams(c2);
    setCampaignValues("DIRECT","Direct");
    setCampaignsToComponent([c, c2]);

    callsToFunctions();

    //chartData when there are data (calls per hour) 2 same campaign name 1 different
    checkChartDataLength(2);

    //labels are 24 (hours)
    checkLabelsLength(24);

    //when it push data: not exists the campaign and push it in the correspondent position
    expect(component.chartData[0].label).toEqual("Real Estate");
    expect(component.chartData[1].label).toEqual("Direct");

    //two array: 1 with the different positions from total (Real Estate), another different with its
    //correspondent position (Direct)
    expect(component.chartData[0].data[2]).toEqual(5);
    expect(component.chartData[0].data[5]).toEqual(4);
    expect(component.chartData[1].data[4]).toEqual(7);

  });

});
