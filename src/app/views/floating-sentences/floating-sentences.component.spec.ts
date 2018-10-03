import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingSentencesComponent } from './floating-sentences.component';
import {CommonModule} from "@angular/common";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularDraggableModule} from "angular2-draggable";
import {CollapseModule, Ng2BootstrapModule} from "ngx-bootstrap";
import {ViewEncapsulation} from "@angular/core";
import {TopNavbarComponent} from "../../components/common/topnavbar/topnavbar.component";

describe('FloatingSentencesComponent', () => {
  let component: FloatingSentencesComponent;
  let fixture: ComponentFixture<FloatingSentencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AngularDraggableModule, CollapseModule ],
      declarations: [ FloatingSentencesComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingSentencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
