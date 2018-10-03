import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';



@Component({
  selector: 'call-record-standard-sentences',
  templateUrl: './call-record-standard-sentences.component.html',
  // host: {'(window:keydown)': 'hotkeys($event)'},
  styleUrls: ['./call-record-standard-sentences.component.css'],
})
export class CallRecordStandardSentencesComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>();
  @Output() onAddSentence = new EventEmitter<string>();
  @Input() newCallRecordModel: string = null;
  @Input()text: Array<{action: string, sentence: string, keyCode: number, letterCode: number}> = [];

  private sentences = this.text;
  private filterSentences = null;
  private sentencesWhenFilter = this.sentences;


  constructor() {
  }

  ngOnInit() {
    //init the select option to unique values
    this.text = this.unique();

  }

  /*
  * Wee need to view the changes of the new call record model
  *
  * - We pass an a filter --> CH, IC, CJ, CS from the New call record (model action)
  *   and force that the filterSentences (ngModel) be one of the action of our array
  *   later calls filter function
  *
  * */

  ngOnChanges(changes) {
    if (changes.newCallRecordModel) {
      if (this.newCallRecordModel) {
        // console.log("###########changes");
        // console.log("model", this.newCallRecordModel);
        switch (this.newCallRecordModel) {
          case "CH":
          case "CJ":
          case "CS":
            this.filterSentences = 'Outgoing';
            break;
          case "IC":
            this.filterSentences = "Incoming";
            break;
          default:
            this.filterSentences = null;
            break;
        }

        this.filter();
      }
    }

    if(changes.text){
      if(this.text){
        this.sentences = this.text;
        this.sentencesWhenFilter = this.sentences;
        this.filter();

      }
    }
  }

  //emit the event to close the panel of standard sentences
  private hide() {
    this.onClose.emit();
  }

  //emit the string (standard sentences) to the notes --> New call record
  private add(s: string) {
    this.onAddSentence.emit(s.trim());
    this.hide();

  }


  //return not repeat action names
  private unique() {
    let output = [];
    let keys = [];

    this.text.forEach(function (item) {
      let key = item['action'];
      if (keys.indexOf(key) === -1) {
        keys.push(key);
        output.push(item)
      }
    });
    return output

  }


  /*
  * NgModel = filterSentences
  * is empty to init
  *
  * - if is null: --All-- options with all the sentences
  *
  * - else if de ngModel option clicked is equal to sentences array action
  *   we push it to the sentencesWhenFilter array
  * */
  private filter() {
    this.sentencesWhenFilter = [];
    if (this.filterSentences === null) {
      this.sentencesWhenFilter = this.sentences;
    } else {
      for (let i in this.sentences) {
        if (this.filterSentences === this.sentences[i].action) {
          this.sentencesWhenFilter.push(this.sentences[i]);
        }
      }
    }
  }



}







