import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactPercentageNewGraphicComponent } from './contact-percentage-new-graphic.component';
import {ChartsModule} from "ng2-charts";
import {Campaign} from "../../models/campaign";
import {ContactPercentage} from "../../models/contact-percentage";

describe('ContactPercentageNewGraphicComponent', () => {
  let component: ContactPercentageNewGraphicComponent;
  let fixture: ComponentFixture<ContactPercentageNewGraphicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ChartsModule ],
      declarations: [ ContactPercentageNewGraphicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactPercentageNewGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('empty contact percentage', () => {
    component.contactPercentage = [];
    component.ngOnChanges({contactPercentage: true});

    expect(component.chartData.length).toEqual(0);
    expect(component.labels.length).toEqual(24);

    for (let val of component.chartData) {
      // expect(val).toEqual(0);
    }
  });

  it('not empty contact percentage', () => {

    expect(component.chartData.length).toEqual(0);

    //instances of calls per hou
    let cp = new ContactPercentage("BUSINESS_BANKING",50,9);

    component.contactPercentage = [cp];

    //instances of Campaign
    let c = new Campaign("BUSINESS_BANKING","Business Banking");

    component.campaigns = [c];

    component.ngOnChanges({contactPercentage: true});

    //chartData when there are data (calls per hour)
    expect(component.chartData.length).toEqual(1);

    //labels are 24 (hours)
    expect(component.labels.length).toEqual(24);

    //when it push data
    expect(component.chartData[0].label).toEqual("Business Banking");
    expect(component.chartData[0].data[1]).toEqual(50);

  });

  it('two contact percentage same campaign', () => {

    expect(component.chartData.length).toEqual(0);

    //instances of calls per hour
    let cp = new ContactPercentage("INDIRECT",100,13);
    let cp2 = new ContactPercentage("INDIRECT", 78,10);

    component.contactPercentage = [cp, cp2];

    //instances of Campaign
    let c = new Campaign("INDIRECT","Indirect");

    component.campaigns = [c];

    component.ngOnChanges({contactPercentage: true});

    //chartData when there are data (calls per hour)
    expect(component.chartData.length).toEqual(1);

    //labels are 24 (hours)
    expect(component.labels.length).toEqual(24);


    //when it push data: exists the campaign and push it in the correspondent position
    //one array
    expect(component.chartData[0].label).toEqual("Indirect");
    expect(component.chartData[0].data[2]).toEqual(78);
    expect(component.chartData[0].data[5]).toEqual(100);

  });

  it('two contact percentage different campaign', () => {

    expect(component.chartData.length).toEqual(0);

    //instances of calls per hour
    let cp = new ContactPercentage("BUSINESS_BANKING",50,9);
    let cp2 = new ContactPercentage("INDIRECT",35,11);

    component.contactPercentage = [cp, cp2];

    //instances of Campaign
    let c = new Campaign("BUSINESS_BANKING","Business Banking");
    let c2 = new Campaign("INDIRECT","Indirect");

    component.campaigns = [c, c2];

    component.ngOnChanges({contactPercentage: true});

    //chartData when there are data (calls per hour) different campaign name
    expect(component.chartData.length).toEqual(2);
    //
    // //labels are 24 (hours)
    expect(component.labels.length).toEqual(24);

    // //when it push data: not exists the campaign and push it in the correspondent position
    expect(component.chartData[0].label).toEqual("Business Banking");
    expect(component.chartData[1].label).toEqual("Indirect");

    //two array
    expect(component.chartData[0].data[1]).toEqual(50);
    expect(component.chartData[1].data[3]).toEqual(35);

  });

  it('three contact percentage: two with same campaign, 1 different campaign', () => {

    expect(component.chartData.length).toEqual(0);

    //instances of calls per hour: 3 array
    let cp = new ContactPercentage("INDIRECT",100,13);
    let cp2 = new ContactPercentage("INDIRECT",75,11);
    let cp3 = new ContactPercentage("BUSINESS_BANKING",50,9);

    component.contactPercentage = [cp, cp2, cp3];

    //instances of Campaign: two different campaigns
    let c = new Campaign("BUSINESS_BANKING","Business Banking");
    let c2 = new Campaign("INDIRECT","Indirect");

    component.campaigns = [c, c2];

    component.ngOnChanges({contactPercentage: true});

    //chartData when there are data (calls per hour) 2 same campaign name 1 different
    expect(component.chartData.length).toEqual(2);

    //labels are 24 (hours)
    expect(component.labels.length).toEqual(24);

    //when it push data: not exists the campaign and push it in the correspondent position
    expect(component.chartData[0].label).toEqual("Indirect");
    expect(component.chartData[1].label).toEqual("Business Banking");

    //two array: 1 with the different positions from total (Indirect), another different with its
    //correspondent position (Business Banking)
    expect(component.chartData[0].data[3]).toEqual(75);
    expect(component.chartData[0].data[5]).toEqual(100);
    expect(component.chartData[1].data[1]).toEqual(50);

  });

});
