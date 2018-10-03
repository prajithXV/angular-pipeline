import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';

import {BsDropdownModule, CollapseModule, ModalModule, PopoverModule} from 'ngx-bootstrap';

import { BasicLayoutComponent } from "./basicLayout.component";
import { BlankLayoutComponent } from "./blankLayout.component";
import { TopNavigationLayoutComponent } from "./topNavigationLayout.component";

import { NavigationComponent } from "./../navigation/navigation.component";
import { FooterComponent } from "./../footer/footer.component";
import { TopNavbarComponent } from "./../topnavbar/topnavbar.component";
import { TopNavigationNavbarComponent } from "./../topnavbar/topnavigationnavbar.component";
import {PipesModule} from "../../../general/pipes.module";
import {TopCallComponent} from "../../../views/top-call/top-call.component";
import {FloatingSentencesComponent} from "../../../views/floating-sentences/floating-sentences.component";
import {AngularDraggableModule} from "angular2-draggable";
import {ResizableModule} from "angular-resizable-element";
import {IboxtoolsModule} from "../iboxtools/iboxtools.module";



@NgModule({
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavigationLayoutComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent,
    TopCallComponent,
    FloatingSentencesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,FormsModule,
    BsDropdownModule.forRoot(),
    PipesModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    AngularDraggableModule,
    ResizableModule,
    IboxtoolsModule
  ],
   exports: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavigationLayoutComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
})

export class LayoutsModule { }
