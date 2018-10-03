import {Component, Injectable, Input, OnChanges, OnInit} from '@angular/core';
import {IncomingCalls} from "../../models/incomingCalls";
import {GraphicFunctions} from "../../general/graphic-functions";


@Component({
  selector: 'incoming-calls-new-graphic',
  templateUrl: './incoming-calls-new-graphic.component.html',
  styleUrls: ['./incoming-calls-new-graphic.component.css']
})


export class IncomingCallsNewGraphicComponent implements OnInit, OnChanges {
  @Input() searchingData: boolean;
  @Input() visibleTable: boolean;
  @Input() incomingCalls: IncomingCalls[];
  private readyChart: boolean = false;

  options = {
    scales: {
      yAxes: [{
        stacked: true
      }]
    },
    legend: {
      display: false,
    },
    elements: {
      line: {
        tension: 0,
      }
    },
    responsive: true
  };

  lineColors = [
    {
      backgroundColor: 'rgba(35,147,239,0)',
      borderColor: 'rgba(35,147,239,0.5)',
      pointBackgroundColor: 'rgba(35,147,239,1)',
      pointBorderColor: 'rgba(35,147,239)',
    }
  ];

  chartData = [

    {
      data: []

    }
  ];


  labels = [ '0 AM','1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM',
    '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'];
  labelsArray = [];

  constructor() {

  }


  ngOnInit() {
  }


  ngOnChanges(changes) {
    if (changes.incomingCalls) {
      if (this.incomingCalls) {
        this.getCorrectLabels();
        this.getNewGraphic();
      }
    }
  }


  private getNewGraphic() {
    this.chartData = [];
    this.chartData = [
      {
        data: GraphicFunctions.generateNull(this.labelsArray)
      }
    ];

    for (let record of this.incomingCalls) {
      this.chartData[0].data[this.getIndexForRecord(record)] = record.total;
    }

    this.readyChart = true;

  }


  private getCorrectLabels() {
    this.labelsArray = [];

    let minMaxHour = this.getMinMaxHour();
    for (let i = minMaxHour.min; i <= minMaxHour.max; ++i) {
      this.labelsArray.push(this.labels[i]);
    }
  }

  private getMinMaxHour() {
    let hours = {
      min: 8,
      max: 17
    };
    for (let record of this.incomingCalls) {
      if (record.hour < hours.min) {
        hours.min = record.hour;
      }
      if (record.hour > hours.max) {
        hours.max = record.hour;
      }
    }
    return hours;
  }


  private getIndexForRecord(record: IncomingCalls) {
    // Return the position of the record based on the hour
    return this.labelsArray.indexOf(GraphicFunctions.getDate(record.hour));
  }


}

