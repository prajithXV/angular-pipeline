import { TestBed, inject } from '@angular/core/testing';

import { MenuStateService } from './menu-state.service';

describe('MenuStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuStateService]
    });
  });

  it('should be created', inject([MenuStateService], (service: MenuStateService) => {
    expect(service).toBeTruthy();
  }));



  function onClickTab(service: MenuStateService, tabId: string, type: boolean){
    service.refreshStateMenu(tabId,type);
  }

  function checkState(service: MenuStateService, tab: string, isTabExpanded: boolean){
    expect(service.getTypeById(tab)).toEqual(isTabExpanded);
  }

  function checkMenuLength(service: MenuStateService, length: number){
    expect(service.menu.length).toEqual(length);

  }

  it('not tabs clicked', inject([MenuStateService], (service: MenuStateService) => {

    //empty menu array when not clicked on the tab
    checkMenuLength(service, 0);

    //expected state tabs by default
    checkState(service, 'tab1', true);
    checkState(service, 'tab2', true);
    checkState(service, 'tab3', true);

  }));


  it('1 tab clicked', inject([MenuStateService], (service: MenuStateService) => {

    //empty menu array when not clicked on the tab
    checkMenuLength(service, 0);

    //expected state tabs by default
    checkState(service, 'tab1', true);

    //click on the tab
    onClickTab(service, "tab1", false);

    //the array has 1 tab and its type is hide (not expanded)
    checkMenuLength(service, 1);
    checkState(service, 'tab1', false);

  }));

  it('same 1 tab clicked twice', inject([MenuStateService], (service: MenuStateService) => {

    //empty menu array when not clicked on the tab
    checkMenuLength(service, 0);

    //expected state tabs by default
    checkState(service, 'tab1', true);

    //click on the tab
    onClickTab(service, "tab1", false);

    //the array has 1 tab and its type is hide (not expanded)
    checkMenuLength(service, 1);
    checkState(service, 'tab1', false);

    //click on the same tab to expand it
    onClickTab(service, "tab1", true);

    //not push it again, the function knows that exists and replace its type
    checkMenuLength(service, 1);

  }));



  it('2 tab clicked', inject([MenuStateService], (service: MenuStateService) => {

    //empty menu array when not clicked on the tab
    checkMenuLength(service, 0);

    //expected state tabs by default
    checkState(service, 'tab1', true);
    checkState(service, 'tab2', true);

    //click on the tabs
    onClickTab(service, "tab1", false);
    onClickTab(service, "tab2", false);

    //the array has 2 tab and its type is hide (not expanded)
    checkMenuLength(service, 2);
    checkState(service, 'tab1', false);
    checkState(service, 'tab2', false);


  }));


  it('2 tab clicked, 1 clicked twice', inject([MenuStateService], (service: MenuStateService) => {

    //empty menu array when not clicked on the tab
    checkMenuLength(service, 0);

    //expected state tabs by default
    checkState(service, 'tab1', true);
    checkState(service, 'tab2', true);
    checkState(service, 'tab3', true);

    //click on the tabs
    onClickTab(service, "tab1", false);
    onClickTab(service, "tab2", false);

    //the array has 2 tab and its type is hide (not expanded)
    checkMenuLength(service, 2);
    checkState(service, 'tab1', false);
    checkState(service, 'tab2', false);

    //click on the same tab2
    onClickTab(service, "tab2", true);

    //not push it again, the function knows that exists and replace its type
    checkMenuLength(service, 2);
    checkState(service, 'tab1', false);
    checkState(service, 'tab2', true);

  }));


  it('2 tab clicked, 1 not clicked', inject([MenuStateService], (service: MenuStateService) => {

    //empty menu array when not clicked on the tab
    checkMenuLength(service, 0);

    //expected state tabs by default
    checkState(service, 'tab1', true);
    checkState(service, 'tab2', true);
    checkState(service, 'tab3', true);

    //click on the tabs
    onClickTab(service, "tab1", false);
    onClickTab(service, "tab2", false);
    onClickTab(service, "tab3", true);

    // the array has 3 tab, 2 are expanded and the last not is expanded
    checkMenuLength(service, 3);
    checkState(service, 'tab1', false);
    checkState(service, 'tab2', false);
    checkState(service, 'tab3', true);

  }));


  it('3 tab clicked, 2 clicked twice', inject([MenuStateService], (service: MenuStateService) => {

    //empty menu array when not clicked on the tab
    checkMenuLength(service, 0);

    //expected state tabs by default
    checkState(service, 'tab1', true);
    checkState(service, 'tab2', true);
    checkState(service, 'tab3', true);


    //click on the tabs
    onClickTab(service, "tab1", false);
    onClickTab(service, "tab2", false);
    onClickTab(service, "tab3", false);

    //the array has 3 tab that are not expanded
    checkMenuLength(service, 3);
    checkState(service, 'tab1', false);
    checkState(service, 'tab2', false);
    checkState(service, 'tab3', false);


    //click on the tabs
    onClickTab(service, "tab1", false);
    onClickTab(service, "tab2", true);
    onClickTab(service, "tab3", true);

    //not push it again, the function knows that exists and replace its type
    checkMenuLength(service, 3);
    checkState(service, 'tab1', false);
    checkState(service, 'tab2', true);
    checkState(service, 'tab3', true);

  }));



  it('4, 3 clicked and 1 clicked later', inject([MenuStateService], (service: MenuStateService) => {

    //empty menu array when not clicked on the tab
    checkMenuLength(service, 0);

    //expected state tabs by default
    checkState(service, 'tab1', true);
    checkState(service, 'tab2', true);
    checkState(service, 'tab3', true);
    checkState(service, 'tab4', true);

    //click on the tabs
    onClickTab(service, "tab1", false);
    onClickTab(service, "tab2", false);
    onClickTab(service, "tab3", false);

    //the array has 3 tab that are not expanded
    checkMenuLength(service, 3);
    checkState(service, 'tab1', false);
    checkState(service, 'tab2', false);
    checkState(service, 'tab3', false);

    //click on the tab
    onClickTab(service, "tab4", false);

    //not push it again, the function knows that exists and replace its type
    //only push the new tab
    checkMenuLength(service, 4);
    checkState(service, 'tab1', false);
    checkState(service, 'tab2', false);
    checkState(service, 'tab3', false);
    checkState(service, 'tab4', false);

  }));

});
