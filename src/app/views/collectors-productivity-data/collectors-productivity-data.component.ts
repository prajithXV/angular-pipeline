import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {CollectorProductivityRecord} from "../../models/collector-productivity-record";
import * as jsPDF  from 'jspdf'
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'collectors-productivity-data',
  templateUrl: './collectors-productivity-data.component.html',
  styleUrls: ['./collectors-productivity-data.component.css']
})
export class CollectorsProductivityDataComponent implements OnInit, OnChanges {
  @Input() records: CollectorProductivityRecord[];
  @Input() searching: boolean = false;
  private recordsSorted: CollectorProductivityRecord[];

  private avgOutbound = (rec: CollectorProductivityRecord) => rec.outboundCalls;
  private avgHoursWorked = (rec: CollectorProductivityRecord) => rec.hoursWorked;
  private avgAverageCallsPerHour = (rec: CollectorProductivityRecord) => rec.averageCallsPerHour;
  private avgContact = (rec: CollectorProductivityRecord) => rec.contact;
  private avgPromises = (rec: CollectorProductivityRecord) => rec.promises;
  private abgPaymentReceived = (rec: CollectorProductivityRecord) => rec.paymentReceived;
  private avgIncomingCalls = (rec: CollectorProductivityRecord) => rec.incomingCalls;
  private avgContactPercentage = (rec: CollectorProductivityRecord) => rec.contactPercentage;
  private avgPromiseToContactPercentage = (rec: CollectorProductivityRecord) => rec.promiseToContactPercentage;
  private avgTotalCalls = (rec: CollectorProductivityRecord) => rec.totalCalls;

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes){

    if (changes.records){
      if (this.records) {
        // Clone and sort records by averageCallsPerHour
        this.recordsSorted = this.records.slice(0);
        this.recordsSorted.sort((r1, r2) => r2.averageCallsPerHour - r1.averageCallsPerHour);
      } else {
        this.recordsSorted = null;
      }
    }
  }

  // position positive is at the beggining and negative at the end. Positions start by 1 (to allow sign
  private isEnhaced(record: CollectorProductivityRecord, pos: number) {
    if (pos > 0) {
      if (pos > this.recordsSorted.length) {
        return false;
      }
      pos--;
    } else {
      pos = this.recordsSorted.length + pos;
      if (pos < 0) {
        return false;
      }
    }
    return this.recordsSorted[pos].averageCallsPerHour == record.averageCallsPerHour;
  }

  average(func: (rec: CollectorProductivityRecord) => number): number {
    if (!this.records.length || this.records.length == 0) {
      return 0;
    }
    let sum = this.records.reduce(((prev, r) =>  isNaN(func(r)) ? 0 : prev + func(r)), 0);
    return sum / this.records.length;
  }

  /*
  * this function is triggered when we click in the button download on the collectors
  * productivity data.
  * */
  download(){

    /*instances of jsPDF
    *
    * l: landscape (orientation)
    * mm: coordinate units
    * a2: format of page
    *
    * */
    let doc = new jsPDF('l', 'mm','a2');

    // We'll make our own renderer to skip this editor
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      },
      '.controls': function(element, renderer){
        return true;
      }
    };

    //margins of the page
    let margins = {
      top: 50,
      bottom: 10,
      left: 70,
      width: 1000
    };

    //this functions only affect to the text that we create in the export, except color and font
    doc.setFontSize(24);
    doc.setFont("open sans");
    doc.setTextColor(255, 0, 0);//red color
    doc.text('Collectors productivity', 265,30 ,"","90","center");


    //we need to find the class with jQuery
    let source = $('.table-responsive');

    //get from the HTML
    doc.fromHTML(
      source.get(0), // HTML string or DOM elem ref.
      margins.left, // x coord
      margins.top, { // y coord
        'width': margins.width, // max width of content on PDF
        'elementHandlers': specialElementHandlers,
        'color': doc.setTextColor(0, 0, 0), //color black
      },

      //exports the pdf with the configuration
      function (dispose) {
        doc.save('CollectorsProductivity.pdf');
      }, margins);

  }
}
