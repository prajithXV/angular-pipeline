import { FilterCodeToNamePipe } from './filter-code-to-name.pipe';
import {Code} from "../models/code";

describe('FilterCodeToNamePipe', () => {
  const pipe = new FilterCodeToNamePipe();
  let _params: any;


  function newParams(params: any){
    return _params = new params();
  }

  function setValues(code: string, name: string){
    _params.code = code;
    _params.name = name;
  }

  function checkName(codes: any, filterCode: string, expectedName: string){
    let resultName = pipe.transform(codes, filterCode);
    expect(resultName).toEqual(expectedName);
  }

  it('create an instance', () => {

    expect(pipe).toBeTruthy();
  });

  it('success name', () => {

    let code1 = newParams(Code);
    setValues('CODE1', 'code name1');


    let code2 = newParams(Code);
    setValues('CODE2', 'code name2');

    let codes = [code1, code2];

    checkName(codes, 'CODE1', 'code name1');

  });


  it('success name: not founded', () => {

    let code1 = newParams(Code);
    setValues('CODE1', 'code name1');


    let code2 = newParams(Code);
    setValues('CODE2', 'code name2');

    let codes = [code1, code2];

    checkName(codes, 'CODE3', null);

  });


  it('no success name: empty array', () => {

    checkName([], 'CODE1', null);


  });


});
