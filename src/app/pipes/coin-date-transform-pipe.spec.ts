import { CoinDateTransformPipe } from './coin-date-transform.pipe';

describe('CoinDateTransformPipePipe', () => {

  const pipe = new CoinDateTransformPipe();
  let _date;

  function transformedDate(date: string, dPattern?: string, oPattern?: string){
    return _date = pipe.transform(date, dPattern, oPattern);
  }

  function checkDate(date: string){
    expect(_date).toEqual(date);
  }

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });


  it('empty date: null', () => {
    transformedDate(null);
    checkDate('');
  });

  it('empty date: empty string', () => {
    transformedDate('');
    checkDate('');
  });

  it('default pattern', () => {
    transformedDate('2018-07-03T13:10:52.237');
    checkDate('07/03/2018 01:10 PM');
  });


  it('MM/DD/YYYY pattern', () => {
    transformedDate('2018-07-03T13:10:52.237', "STD_DATE");
    checkDate('07/03/2018');
  });

  it('hh:mm A pattern', () => {
    transformedDate('2018-07-03T13:10:52.237', "STD_TIME");
    checkDate('01:10 PM');
  });

  it('default pattern + oPattern', () => {
    transformedDate('1/12/2015 12:00:00 AM', "", 'MM/DD/YYYY hh:mm:ss A');
    checkDate('01/12/2015 12:00 AM');
  });

  it('MM/DD/YYYY pattern + oPattern', () => {
    transformedDate('1/12/2015 12:00:00 AM', "STD_DATE", 'MM/DD/YYYY hh:mm:ss A');
    checkDate('01/12/2015');
  });

  it('hh:mm A pattern + oPattern', () => {
    transformedDate('1/12/2015 12:00:00 AM', "STD_TIME", 'MM/DD/YYYY hh:mm:ss A');
    checkDate('12:00 AM');
  });


});
